import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useCreateMember = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (memberData: any) => {
      console.log("Creating member with data:", memberData);

      // Remove user_id from the data since it should be null for public registrations
      const { user_id, ...cleanData } = memberData;

      const { data, error } = await supabase
        .from("members")
        .insert([cleanData])
        .select()
        .single();

      if (error) {
        console.error("Member creation error:", error);
        throw error;
      }

      console.log("Member created successfully:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast({
        title: "Success!",
        description:
          "Your membership application has been submitted successfully. We'll review it shortly.",
      });
    },
    onError: (error: any) => {
      console.error("Member creation mutation error:", error);
      toast({
        title: "Error",
        description:
          error.message ||
          "Failed to submit membership application. Please try again.",
        variant: "destructive",
      });
    },
  });
};
