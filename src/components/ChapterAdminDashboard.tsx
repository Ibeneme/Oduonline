import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Users, Calendar, Newspaper, DollarSign, Shield } from "lucide-react";

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
  chapter_id: string | null;
  created_at: string;
  updated_at: string;
  temp_password: string | null;
  password_changed: boolean | null;
}

interface ChapterData {
  id: string;
  name: string;
  location: string;
  description: string | null;
}

const ChapterAdminDashboard = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [stats, setStats] = useState({
    members: 0,
    pendingMembers: 0,
    events: 0,
    donations: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        navigate("/auth");
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (!profile || profile.role !== "chapter_admin") {
          navigate("/");
          return;
        }

        setUserProfile(profile);

        // Fetch chapter data if chapter_id exists
        if (profile.chapter_id) {
          const { data: chapter } = await supabase
            .from("chapters")
            .select("*")
            .eq("id", profile.chapter_id)
            .single();

          setChapterData(chapter);
          await fetchChapterStats(profile.chapter_id);
        }
      } catch (error) {
        console.error("Error checking access:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [user, navigate]);

  const fetchChapterStats = async (chapterId: string) => {
    try {
      // Get members count
      const { count: membersCount } = await supabase
        .from("members")
        .select("*", { count: "exact", head: true })
        .eq("chapter_id", chapterId);

      // Get pending members count
      const { count: pendingCount } = await supabase
        .from("members")
        .select("*", { count: "exact", head: true })
        .eq("chapter_id", chapterId)
        .eq("status", "pending");

      setStats({
        members: membersCount || 0,
        pendingMembers: pendingCount || 0,
        events: 0, // Will be updated when events table is available
        donations: 0, // Will be updated when donations table is available
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
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
    {
      title: "Total Members",
      value: stats.members,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Pending Approvals",
      value: stats.pendingMembers,
      icon: Users,
      color: "bg-yellow-500",
    },
    {
      title: "Chapter Events",
      value: stats.events,
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      title: "Total Donations",
      value: `₦${stats.donations.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-purple-500",
    },
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
                <h1 className="text-2xl font-bold text-white">
                  Chapter Admin Dashboard
                </h1>
                <p className="text-purple-100">
                  Managing {chapterData?.name || "Your Chapter"} -{" "}
                  {chapterData?.location || "Unknown Location"}
                </p>
              </div>
            </div>
            <Badge className="bg-white text-purple-600">Chapter Admin</Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white/90 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`p-3 ${stat.color} rounded-full`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chapter Info */}
          {chapterData && (
            <Card className="mb-8">
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
                    <p className="text-lg">
                      {chapterData.description || "No description available"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common chapter management tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col gap-2 bg-gradient-to-r from-blue-500 to-purple-500">
                <Users className="h-6 w-6" />
                Manage Members
              </Button>
              <Button className="h-20 flex flex-col gap-2 bg-gradient-to-r from-green-500 to-blue-500">
                <Calendar className="h-6 w-6" />
                Schedule Event
              </Button>
              <Button className="h-20 flex flex-col gap-2 bg-gradient-to-r from-purple-500 to-pink-500">
                <Newspaper className="h-6 w-6" />
                Create News Post
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChapterAdminDashboard;
