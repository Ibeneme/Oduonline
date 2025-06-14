import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SubAdminManagement from "@/components/SubAdminManagement";
import ChapterManagement from "@/components/ChapterManagement";
import NewsManagement from "@/components/NewsManagement";
import MemberManagement from "@/components/MemberManagement";
import EventManagement from "@/components/EventManagement";
import GalleryManagement from "@/components/GalleryManagement";
import QuickActions from "@/components/QuickActions";
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
import {
  Users,
  Calendar,
  Newspaper,
  Contact,
  Edit,
  CheckCircle,
  Clock,
  Shield,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      if (!user) {
        navigate("/auth");
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        // Route chapter admins to their specific dashboard
        if (profile?.role === "chapter_admin") {
          navigate("/chapter-admin");
          return;
        }

        if (!profile || !["super_admin"].includes(profile.role)) {
          navigate("/");
          return;
        }

        setUserRole(profile.role);
      } catch (error) {
        console.error("Error checking user role:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!user || !userRole) {
    return null;
  }

  const stats = [
    {
      title: "Total Members",
      value: "487",
      icon: Users,
      change: "+12 this month",
    },
    {
      title: "Active Chapters",
      value: "5",
      icon: Contact,
      change: "+1 new chapter",
    },
    {
      title: "Funds Raised",
      value: "₦52.3M",
      icon: Calendar,
      change: "+₦5M this month",
    },
    {
      title: "Active Projects",
      value: "8",
      icon: Newspaper,
      change: "3 completed",
    },
  ];

  const recentMembers = [
    {
      name: "John Smith",
      chapter: "UK",
      status: "Pending",
      date: "Nov 20, 2024",
    },
    {
      name: "Mary Johnson",
      chapter: "Canada",
      status: "Approved",
      date: "Nov 19, 2024",
    },
    {
      name: "David Wilson",
      chapter: "USA",
      status: "Pending",
      date: "Nov 18, 2024",
    },
    {
      name: "Sarah Brown",
      chapter: "Germany",
      status: "Approved",
      date: "Nov 17, 2024",
    },
  ];

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "members", label: "Members" },
    { id: "chapters", label: "Chapters" },
    { id: "subadmins", label: "Sub-Admins" },
    { id: "news", label: "News" },
    { id: "events", label: "Events" },
    { id: "gallery", label: "Gallery" },
    { id: "finances", label: "Finances" },
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
                  Super Admin Dashboard
                </h1>
                <p className="text-purple-100">Welcome back, {user.email}</p>
              </div>
            </div>
            <QuickActions onTabChange={setActiveTab} />
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

      {/* Main Content */}
      <div className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-3 bg-gradient-to-br from-green-100 to-purple-100 rounded-full">
                          <stat.icon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-600">
                            {stat.title}
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {stat.value}
                          </p>
                          <p className="text-xs text-green-600">
                            {stat.change}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pending Approvals */}
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-green-700">
                      Pending Member Applications
                    </CardTitle>
                    <CardDescription>
                      Recent membership applications awaiting approval
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentMembers.map((member, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-300 bg-gradient-to-r from-white to-purple-50"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {member.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {member.chapter} Chapter
                            </p>
                            <p className="text-xs text-gray-500">
                              {member.date}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                member.status === "Approved"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                member.status === "Approved"
                                  ? "bg-gradient-to-r from-green-500 to-purple-500 text-white"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {member.status === "Approved" ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <Clock className="h-3 w-3 mr-1" />
                              )}
                              {member.status}
                            </Badge>
                            {member.status === "Pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-purple-300 text-purple-600 hover:bg-purple-50"
                              >
                                Review
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-purple-700">
                      Quick Actions
                    </CardTitle>
                    <CardDescription>
                      Common administrative tasks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-green-50 to-purple-50 text-purple-600 border border-purple-200 hover:from-green-100 hover:to-purple-100"
                      variant="outline"
                      onClick={() => setActiveTab("members")}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Add New Member
                    </Button>
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-purple-50 to-green-50 text-green-600 border border-green-200 hover:from-purple-100 hover:to-green-100"
                      variant="outline"
                      onClick={() => setActiveTab("news")}
                    >
                      <Newspaper className="h-4 w-4 mr-2" />
                      Create News Post
                    </Button>
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-green-50 to-purple-50 text-purple-600 border border-purple-200 hover:from-green-100 hover:to-purple-100"
                      variant="outline"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Event
                    </Button>
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-purple-50 to-green-50 text-green-600 border border-green-200 hover:from-purple-100 hover:to-green-100"
                      variant="outline"
                      onClick={() => setActiveTab("chapters")}
                    >
                      <Contact className="h-4 w-4 mr-2" />
                      Manage Chapters
                    </Button>
                    <Button
                      className="w-full justify-start bg-gradient-to-r from-green-50 to-purple-50 text-purple-600 border border-purple-200 hover:from-green-100 hover:to-purple-100"
                      variant="outline"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Send Newsletter
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "members" && <MemberManagement />}

          {activeTab === "chapters" && <ChapterManagement />}

          {activeTab === "subadmins" && <SubAdminManagement />}

          {activeTab === "news" && <NewsManagement />}

          {activeTab === "events" && <EventManagement />}

          {activeTab === "gallery" && <GalleryManagement />}

          {activeTab === "finances" && (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-700">
                  Financial Management
                </CardTitle>
                <CardDescription>
                  Track donations, membership fees, and project funding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    Financial management interface would be implemented here.
                  </p>
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

export default AdminDashboard;
