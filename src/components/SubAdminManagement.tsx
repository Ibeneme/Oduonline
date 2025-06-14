import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useChapters } from "@/hooks/useChapters";
import { useAuth } from "@/hooks/useAuth";
import {
  Users,
  Edit,
  Trash,
  Copy,
  Eye,
  EyeOff,
  Ban,
  CheckCircle,
  RefreshCw,
} from "lucide-react";

interface ChapterAdmin {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
  chapter_id: string | null;
  chapter_name?: string;
  password_changed: boolean | null;
  created_at: string;
  temp_password: string | null;
  updated_at: string;
  restricted: boolean | null;
}

const SubAdminManagement = () => {
  const [admins, setAdmins] = useState<ChapterAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createdAdmin, setCreatedAdmin] = useState<{
    user: any;
    temp_password: string;
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<ChapterAdmin | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { data: chapters } = useChapters();
  const { session } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    chapter_id: "",
  });

  const [editFormData, setEditFormData] = useState({
    full_name: "",
    chapter_id: "",
  });

  useEffect(() => {
    fetchSubAdmins();
  }, []);

  const fetchSubAdmins = async (showRefreshMessage = false) => {
    try {
      if (showRefreshMessage) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      console.log("Fetching chapter admins...");

      // Fetch all profiles with chapter_admin role
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "chapter_admin")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching chapter admins:", error);
        throw error;
      }

      console.log("Found chapter admins:", data);

      // Get chapter names for each admin
      const adminsWithChapterNames = await Promise.all(
        (data || []).map(async (admin) => {
          let chapterName = "No Chapter Assigned";

          if (admin.chapter_id) {
            try {
              const { data: chapter, error: chapterError } = await supabase
                .from("chapters")
                .select("name")
                .eq("id", admin.chapter_id)
                .single();

              if (!chapterError && chapter) {
                chapterName = chapter.name;
              }
            } catch (err) {
              console.warn(
                "Could not fetch chapter name for admin:",
                admin.id,
                err
              );
            }
          }

          return {
            ...admin,
            chapter_name: chapterName,
            restricted: admin.restricted || false,
          };
        })
      );

      console.log(
        "Processed admin data with chapters:",
        adminsWithChapterNames
      );
      setAdmins(adminsWithChapterNames);

      if (showRefreshMessage) {
        toast({
          title: "Success",
          description: `Found ${adminsWithChapterNames.length} chapter admin(s)`,
        });
      }
    } catch (error: any) {
      console.error("Fetch admins error:", error);
      toast({
        title: "Error",
        description:
          "Failed to fetch chapter admins: " +
          (error.message || "Unknown error"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const createSubAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      if (!session?.access_token) {
        throw new Error("No authentication token available");
      }

      console.log("Creating admin with data:", formData);

      const response = await fetch(
        `https://kecbiuksxklaqzjcsdss.supabase.co/functions/v1/create-admin-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlY2JpdWtzeGtsYXF6amNzZHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMTQ0NTQsImV4cCI6MjA2MzY5MDQ1NH0.f41xLEKj1ofLt4LJgVr3PguYO18tHmrIdNrgdALSqJU",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);

        let errorMessage = "Failed to create chapter admin";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Admin creation successful:", result);

      setCreatedAdmin({
        user: result.user,
        temp_password: result.temp_password,
      });

      toast({
        title: "Success!",
        description:
          "Chapter admin created successfully. Please note the temporary password.",
      });

      setFormData({ email: "", full_name: "", chapter_id: "" });
      setShowCreateForm(false);

      // Refresh the list after a short delay
      setTimeout(() => {
        fetchSubAdmins(true);
      }, 2000);
    } catch (error: any) {
      console.error("Create admin error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create chapter admin",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  const restrictAdmin = async (adminId: string, restrict: boolean) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ restricted: restrict })
        .eq("id", adminId);

      if (error) throw error;

      toast({
        title: "Success!",
        description: `Admin ${
          restrict ? "restricted" : "unrestricted"
        } successfully`,
      });

      fetchSubAdmins();
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to ${restrict ? "restrict" : "unrestrict"} admin`,
        variant: "destructive",
      });
    }
  };

  const editAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdmin) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: editFormData.full_name,
          chapter_id: editFormData.chapter_id,
        })
        .eq("id", editingAdmin.id);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Admin updated successfully",
      });

      setShowEditDialog(false);
      setEditingAdmin(null);
      fetchSubAdmins();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update admin",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (admin: ChapterAdmin) => {
    setEditingAdmin(admin);
    setEditFormData({
      full_name: admin.full_name || "",
      chapter_id: admin.chapter_id || "",
    });
    setShowEditDialog(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "Temporary password copied to clipboard",
      });
    });
  };

  const deleteSubAdmin = async (adminId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this chapter admin? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      // First delete the profile
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", adminId);

      if (profileError) {
        console.error("Profile deletion error:", profileError);
      }

      // Then try to delete the auth user
      const { error: authError } = await supabase.auth.admin.deleteUser(
        adminId
      );

      if (authError) {
        console.error("Auth user deletion error:", authError);
        // Don't throw here as profile might have been deleted successfully
      }

      toast({
        title: "Success!",
        description: "Chapter admin deleted successfully",
      });

      fetchSubAdmins();
    } catch (error: any) {
      console.error("Delete admin error:", error);
      toast({
        title: "Error",
        description:
          "Failed to delete chapter admin: " +
          (error.message || "Unknown error"),
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Show created admin details */}
      {createdAdmin && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription>
            <div className="space-y-3">
              <h4 className="font-semibold text-green-800">
                Admin Created Successfully!
              </h4>
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong> {createdAdmin.user.email}
                </p>
                <p>
                  <strong>Name:</strong> {createdAdmin.user.full_name}
                </p>
                <div className="flex items-center gap-2">
                  <strong>Temporary Password:</strong>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {showPassword ? createdAdmin.temp_password : "••••••••••••"}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(createdAdmin.temp_password)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-green-700">
                  Please share this temporary password with the new admin. They
                  will be required to change it on first login.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setCreatedAdmin(null)}
              >
                Dismiss
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Chapter Sub-Admins ({admins.length})
              </CardTitle>
              <CardDescription>
                Manage chapter administrators and their permissions
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => fetchSubAdmins(true)}
                disabled={refreshing}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "Refreshing..." : "Refresh"}
              </Button>
              <Button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-gradient-to-r from-green-600 to-purple-600"
              >
                Create Sub-Admin
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* ... keep existing code (create form) */}
          {showCreateForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Create New Chapter Admin</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={createSubAdmin} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            full_name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="chapter">Assign Chapter</Label>
                    <Select
                      value={formData.chapter_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, chapter_id: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a chapter" />
                      </SelectTrigger>
                      <SelectContent>
                        {chapters?.map((chapter) => (
                          <SelectItem key={chapter.id} value={chapter.id}>
                            {chapter.name} - {chapter.location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={creating}>
                      {creating ? "Creating..." : "Create Admin"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCreateForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Chapter</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Access</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">
                    {admin.full_name || "N/A"}
                  </TableCell>
                  <TableCell>{admin.email || "N/A"}</TableCell>
                  <TableCell>{admin.chapter_name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={admin.password_changed ? "default" : "secondary"}
                    >
                      {admin.password_changed ? "Active" : "Pending Setup"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={admin.restricted ? "destructive" : "default"}
                    >
                      {admin.restricted ? "Restricted" : "Full Access"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(admin.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(admin)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          restrictAdmin(admin.id, !admin.restricted)
                        }
                        className={
                          admin.restricted
                            ? "text-green-600"
                            : "text-yellow-600"
                        }
                      >
                        {admin.restricted ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Ban className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteSubAdmin(admin.id)}
                        className="text-red-600"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {admins.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No chapter admins found</p>
              <p className="text-sm text-gray-400 mt-2">
                Create a new chapter admin to get started
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Admin Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Chapter Admin</DialogTitle>
            <DialogDescription>
              Update admin information and chapter assignment
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={editAdmin} className="space-y-4">
            <div>
              <Label htmlFor="edit_full_name">Full Name</Label>
              <Input
                id="edit_full_name"
                value={editFormData.full_name}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    full_name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="edit_chapter">Chapter Assignment</Label>
              <Select
                value={editFormData.chapter_id}
                onValueChange={(value) =>
                  setEditFormData({ ...editFormData, chapter_id: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a chapter" />
                </SelectTrigger>
                <SelectContent>
                  {chapters?.map((chapter) => (
                    <SelectItem key={chapter.id} value={chapter.id}>
                      {chapter.name} - {chapter.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Update Admin</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEditDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubAdminManagement;
