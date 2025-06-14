
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Content-Type': 'application/json',
}

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        console.log('Create admin user function called')

        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            {
                auth: {
                    autoRefreshToken: false,
                    persistSession: false
                }
            }
        )

        // Get the authorization header from the request
        const authHeader = req.headers.get('Authorization')
        if (!authHeader) {
            console.error('Missing authorization header')
            return new Response(
                JSON.stringify({ error: 'Missing authorization header' }),
                { status: 401, headers: corsHeaders }
            )
        }

        const token = authHeader.replace('Bearer ', '')

        // Verify the user making the request is authenticated
        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
        if (authError || !user) {
            console.error('Auth error:', authError)
            return new Response(
                JSON.stringify({ error: 'Unauthorized' }),
                { status: 401, headers: corsHeaders }
            )
        }

        console.log('User authenticated:', user.id)

        // Check if the user has admin role
        const { data: profile, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profileError) {
            console.error('Profile fetch error:', profileError)
            return new Response(
                JSON.stringify({ error: 'Failed to fetch user profile' }),
                { status: 500, headers: corsHeaders }
            )
        }

        console.log('User role:', profile?.role)

        if (!profile || !['super_admin'].includes(profile.role)) {
            console.error('User not allowed. Role:', profile?.role)
            return new Response(
                JSON.stringify({ error: 'User not allowed to create admins' }),
                { status: 403, headers: corsHeaders }
            )
        }

        // Parse request body
        let requestData
        try {
            const requestBody = await req.text()
            console.log('Request body received:', requestBody)

            if (!requestBody) {
                return new Response(
                    JSON.stringify({ error: 'Missing request body' }),
                    { status: 400, headers: corsHeaders }
                )
            }

            requestData = JSON.parse(requestBody)
        } catch (parseError) {
            console.error('JSON parse error:', parseError)
            return new Response(
                JSON.stringify({ error: 'Invalid JSON in request body' }),
                { status: 400, headers: corsHeaders }
            )
        }

        const { email, full_name, chapter_id } = requestData

        if (!email || !full_name || !chapter_id) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields: email, full_name, chapter_id' }),
                { status: 400, headers: corsHeaders }
            )
        }

        console.log('Creating user with:', { email, full_name, chapter_id })

        // Check if user already exists
        const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers()
        const userExists = existingUser?.users?.some(u => u.email === email)

        if (userExists) {
            console.error('User already exists with email:', email)
            return new Response(
                JSON.stringify({ error: 'A user with this email address has already been registered' }),
                { status: 400, headers: corsHeaders }
            )
        }

        // Generate temporary password
        const tempPassword = Math.random().toString(36).slice(-12) + 'A1!'

        // Create user account
        const { data: authData, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password: tempPassword,
            email_confirm: true,
            user_metadata: {
                full_name,
            }
        })

        if (createError) {
            console.error('User creation error:', createError)
            return new Response(
                JSON.stringify({ error: createError.message || 'Failed to create user' }),
                { status: 400, headers: corsHeaders }
            )
        }

        console.log('User created successfully:', authData.user?.id)

        if (!authData.user) {
            return new Response(
                JSON.stringify({ error: 'User creation failed - no user data returned' }),
                { status: 500, headers: corsHeaders }
            )
        }

        // Wait a moment for the user to be fully created
        await new Promise(resolve => setTimeout(resolve, 1000));

        // First check if profile already exists (might be created by trigger)
        const { data: existingProfile } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('id', authData.user.id)
            .single()

        if (existingProfile) {
            console.log('Profile exists, updating it')
            // Update existing profile
            const { error: profileUpdateError } = await supabaseAdmin
                .from('profiles')
                .update({
                    role: 'chapter_admin',
                    chapter_id: chapter_id,
                    temp_password: tempPassword,
                    password_changed: false,
                    full_name: full_name,
                    email: email
                })
                .eq('id', authData.user.id)

            if (profileUpdateError) {
                console.error('Profile update error:', profileUpdateError)

                // Try to clean up the created user if profile update fails
                try {
                    await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
                    console.log('Cleaned up user after profile update failure')
                } catch (cleanupError) {
                    console.error('Failed to cleanup user:', cleanupError)
                }

                return new Response(
                    JSON.stringify({ error: 'Failed to update user profile: ' + profileUpdateError.message }),
                    { status: 500, headers: corsHeaders }
                )
            }
        } else {
            console.log('Profile does not exist, creating it')
            // Create new profile
            const { error: profileCreateError } = await supabaseAdmin
                .from('profiles')
                .insert({
                    id: authData.user.id,
                    email: email,
                    full_name: full_name,
                    role: 'chapter_admin',
                    chapter_id: chapter_id,
                    temp_password: tempPassword,
                    password_changed: false
                })

            if (profileCreateError) {
                console.error('Profile creation error:', profileCreateError)

                // Try to clean up the created user if profile creation fails
                try {
                    await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
                    console.log('Cleaned up user after profile creation failure')
                } catch (cleanupError) {
                    console.error('Failed to cleanup user:', cleanupError)
                }

                return new Response(
                    JSON.stringify({ error: 'Failed to create user profile: ' + profileCreateError.message }),
                    { status: 500, headers: corsHeaders }
                )
            }
        }

        console.log('Profile processed successfully')

        // Verify the profile was created/updated correctly
        const { data: finalProfile, error: verifyError } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('id', authData.user.id)
            .single()

        if (verifyError || !finalProfile) {
            console.error('Profile verification failed:', verifyError)
            return new Response(
                JSON.stringify({ error: 'Failed to verify profile creation' }),
                { status: 500, headers: corsHeaders }
            )
        }

        console.log('Final profile verification:', finalProfile)

        const response = {
            success: true,
            user: {
                id: authData.user.id,
                email: authData.user.email,
                full_name: full_name
            },
            temp_password: tempPassword,
            message: 'Chapter admin created successfully'
        }

        console.log('Returning success response')

        return new Response(
            JSON.stringify(response),
            { status: 200, headers: corsHeaders }
        )

    } catch (error) {
        console.error('Edge function error:', error)
        return new Response(
            JSON.stringify({
                error: error.message || 'Internal server error',
                details: 'Check function logs for more details'
            }),
            { status: 500, headers: corsHeaders }
        )
    }