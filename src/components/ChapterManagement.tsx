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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Edit, Trash, Plus } from "lucide-react";

interface Chapter {
  id: string;
  name: string;
  location: string;
  description: string | null;
  established: string | null;
  leader: string | null;
  members_count: number | null;
  status: string | null;
  created_at: string;
}

const ChapterManagement = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    established: "",
    leader: "",
  });

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const { data, error } = await supabase
        .from("chapters")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setChapters(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch chapters",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const { error } = await supabase.from("chapters").insert([formData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Chapter created successfully",
      });

      setFormData({
        name: "",
        location: "",
        description: "",
        established: "",
        leader: "",
      });
      setShowCreateForm(false);
      fetchChapters();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create chapter",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  const deleteChapter = async (chapterId: string) => {
    try {
      const { error } = await supabase
        .from("chapters")
        .delete()
        .eq("id", chapterId);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Chapter deleted successfully",
      });

      fetchChapters();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete chapter",
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
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Chapter Management
              </CardTitle>
              <CardDescription>
                Create and manage organization chapters
              </CardDescription>
            </div>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-gradient-to-r from-green-600 to-purple-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Chapter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showCreateForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Create New Chapter</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={createChapter} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Chapter Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="established">Established</Label>
                      <Input
                        id="established"
                        value={formData.established}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            established: e.target.value,
                          })
                        }
                        placeholder="e.g., 2020"
                      />
                    </div>
                    <div>
                      <Label htmlFor="leader">Chapter Leader</Label>
                      <Input
                        id="leader"
                        value={formData.leader}
                        onChange={(e) =>
                          setFormData({ ...formData, leader: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={creating}>
                      {creating ? "Creating..." : "Create Chapter"}
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
                <TableHead>Location</TableHead>
                <TableHead>Leader</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Established</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chapters.map((chapter) => (
                <TableRow key={chapter.id}>
                  <TableCell className="font-medium">{chapter.name}</TableCell>
                  <TableCell>{chapter.location}</TableCell>
                  <TableCell>{chapter.leader || "Not assigned"}</TableCell>
                  <TableCell>{chapter.members_count || 0}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        chapter.status === "active" ? "default" : "secondary"
                      }
                    >
                      {chapter.status || "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell>{chapter.established || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteChapter(chapter.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {chapters.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No chapters found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChapterManagement;
