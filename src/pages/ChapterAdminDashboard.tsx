import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, DollarSign, Shield, Mail, CheckCircle, XCircle, Edit } from "lucide-react";

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
  chapter_id: string | null;
  password_changed: boolean | null;
}

interface ChapterData {
  id: string;
  name: string;
  location: string;
  description: string | null;
}

interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  created_at: string;
  phone: string | null;
  occupation: string | null;
}

const ChapterAdminDashboard = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [stats, setStats] = useState({
    totalMembers: 0,
    pendingMembers: 0,
    approvedMembers: 0,
    donations: 0
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        console.log('No user found, redirecting to auth');
        navigate('/auth');
        return;
      }

      try {
        console.log('Checking access for user:', user.id);
        
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          throw error;
        }

        console.log('User profile:', profile);

        if (!profile) {
          console.error('No profile found for user');
          navigate('/');
          return;
        }

        if (profile.role !== 'chapter_admin') {
          console.error('User is not a chapter admin. Role:', profile.role);
          navigate('/');
          return;
        }

        if (profile.restricted) {
          console.error('User access is restricted');
          toast({
            title: "Access Restricted",
            description: "Your access has been restricted. Please contact the super admin.",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        setUserProfile(profile);
        
        if (profile.chapter_id) {
          console.log('Fetching chapter data for:', profile.chapter_id);
          const { data: chapter } = await supabase
            .from('chapters')
            .select('*')
            .eq('id', profile.chapter_id)
            .single();
          
          if (chapter) {
            console.log('Chapter data:', chapter);
            setChapterData(chapter);
            await fetchChapterMembers(profile.chapter_id);
            await fetchChapterStats(profile.chapter_id);
          }
        } else {
          console.log('No chapter assigned to this admin');
        }
      } catch (error) {
        console.error('Error checking access:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [user, navigate, toast]);

  const fetchChapterMembers = async (chapterId: string) => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('chapter_id', chapterId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const fetchChapterStats = async (chapterId: string) => {
    try {
      const { count: totalCount } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true })
        .eq('chapter_id', chapterId);

      const { count: pendingCount } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true })
        .eq('chapter_id', chapterId)
        .eq('status', 'pending');

      const { count: approvedCount } = await supabase
        .from('members')
        .select('*', { count: 'exact', head: true })
        .eq('chapter_id', chapterId)
        .eq('status', 'approved');

      setStats({
        totalMembers: totalCount || 0,
        pendingMembers: pendingCount || 0,
        approvedMembers: approvedCount || 0,
        donations: 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const approveMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('members')
        .update({ status: 'approved' })
        .eq('id', memberId);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Member approved successfully",
      });

      if (userProfile?.chapter_id) {
        await fetchChapterMembers(userProfile.chapter_id);
        await fetchChapterStats(userProfile.chapter_id);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to approve member",
        variant: "destructive",
      });
    }
  };

  const rejectMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('members')
        .update({ status: 'rejected' })
        .eq('id', memberId);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Member rejected",
      });

      if (userProfile?.chapter_id) {
        await fetchChapterMembers(userProfile.chapter_id);
        await fetchChapterStats(userProfile.chapter_id);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to reject member",
        variant: "destructive",
      });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      // Update password_changed flag
      await supabase
        .from('profiles')
        .update({ password_changed: true })
        .eq('id', user?.id);

      toast({
        title: "Success!",
        description: "Password updated successfully",
      });

      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setShowPasswordChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { title: "Total Members", value: stats.totalMembers, icon: Users, color: "bg-blue-500" },
    { title: "Pending Approvals", value: stats.pendingMembers, icon: Users, color: "bg-yellow-500" },
    { title: "Approved Members", value: stats.approvedMembers, icon: CheckCircle, color: "bg-green-500" },
    { title: "Chapter Funds", value: `₦${stats.donations.toLocaleString()}`, icon: DollarSign, color: "bg-purple-500" }
  ];

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "members", label: "Members" },
    { id: "finances", label: "Finances" },
    { id: "newsletter", label: "Newsletter" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-purple-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-purple-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-white mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-white">Chapter Admin Dashboard</h1>
                <p className="text-purple-100">
                  Managing {chapterData?.name || 'Your Chapter'} - {chapterData?.location || 'Unknown Location'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-white text-purple-600">Chapter Admin</Badge>
              <Button
                variant="outline"
                className="bg-white text-purple-600 border-white hover:bg-purple-50"
                onClick={() => setShowPasswordChange(true)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordChange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">Update Password</Button>
                  <Button type="button" variant="outline" onClick={() => setShowPasswordChange(false)}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                  <Card key={index} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className={`p-3 ${stat.color} rounded-full`}>
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Chapter Info */}
              {chapterData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Chapter Information</CardTitle>
                    <CardDescription>Your assigned chapter details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="font-medium text-gray-600">Chapter Name</p>
                        <p className="text-lg">{chapterData.name}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Location</p>
                        <p className="text-lg">{chapterData.location}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Description</p>
                        <p className="text-lg">{chapterData.description || 'No description available'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === "members" && (
            <Card>
              <CardHeader>
                <CardTitle>Chapter Members</CardTitle>
                <CardDescription>Manage your chapter members and approve new applications</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Occupation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.first_name} {member.last_name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.phone || 'N/A'}</TableCell>
                        <TableCell>{member.occupation || 'N/A'}</TableCell>
                        <TableCell>
                          <Badge variant={
                            member.status === 'approved' ? 'default' : 
                            member.status === 'pending' ? 'secondary' : 
                            'destructive'
                          }>
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(member.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {member.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => approveMember(member.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => rejectMember(member.id)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {members.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No members found for your chapter</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "finances" && (
            <Card>
              <CardHeader>
                <CardTitle>Chapter Finances</CardTitle>
                <CardDescription>Track your chapter's financial activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <DollarSign className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Financial management interface</p>
                  <p className="text-gray-400">Track donations, expenses, and chapter funds</p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "newsletter" && (
            <Card>
              <CardHeader>
                <CardTitle>Send Newsletter</CardTitle>
                <CardDescription>Send newsletters to your chapter members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter newsletter subject" />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea id="content" placeholder="Enter newsletter content" rows={10} />
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Mail className="h-4 w-4 mr-2" />
                    Send to Chapter Members ({stats.approvedMembers} recipients)
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChapterAdminDashboard;
