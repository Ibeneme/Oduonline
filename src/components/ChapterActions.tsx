
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Users, Calendar, MapPin, Mail, Phone, Camera, UserPlus } from "lucide-react";

interface Chapter {
  id: string;
  name: string;
  location: string;
  status: string;
  members_count: number;
  established: string;
  description: string;
  leader: string;
  next_meeting: string;
}

interface ChapterActionsProps {
  chapter: Chapter;
}

const ChapterActions = ({ chapter }: ChapterActionsProps) => {
  const { toast } = useToast();

  const handleJoinChapter = () => {
    // Redirect to membership form with chapter pre-selected
    const membershipUrl = `/membership?chapter=${encodeURIComponent(chapter.id)}`;
    window.location.href = membershipUrl;
  };

  const handleContactLeader = () => {
    toast({
      title: "Contact Information",
      description: `To contact ${chapter.leader}, please use the main contact form or reach out through our official channels.`,
    });
  };

  const handleViewGallery = () => {
    // Redirect to gallery page
    window.location.href = '/gallery';
  };

  return (
    <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
      <CardHeader className="bg-gradient-to-br from-green-50 to-purple-50 rounded-t-lg">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
              {chapter.name}
            </CardTitle>
            <div className="flex items-center text-gray-600 mt-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{chapter.location}</span>
            </div>
          </div>
          <Badge 
            variant={chapter.status === 'active' ? 'default' : 'secondary'}
            className={chapter.status === 'active' 
              ? "bg-gradient-to-r from-green-500 to-purple-500 text-white" 
              : "bg-yellow-100 text-yellow-800"
            }
          >
            {chapter.status.charAt(0).toUpperCase() + chapter.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <p className="text-gray-700 mb-4">{chapter.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-purple-50 rounded-lg">
            <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{chapter.members_count}</p>
            <p className="text-sm text-gray-600">Members</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-green-50 rounded-lg">
            <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-900">Est. {chapter.established}</p>
            <p className="text-sm text-gray-600">Established</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2 text-purple-600" />
            <span><strong>Leader:</strong> {chapter.leader}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-green-600" />
            <span><strong>Meetings:</strong> {chapter.next_meeting}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={handleJoinChapter}
            className="w-full bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Join This Chapter
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={handleContactLeader}
              variant="outline" 
              className="border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Leader
            </Button>
            <Button 
              onClick={handleViewGallery}
              variant="outline" 
              className="border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400 transition-all duration-300"
            >
              <Camera className="h-4 w-4 mr-2" />
              View Gallery
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChapterActions;