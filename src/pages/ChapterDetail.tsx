import { useParams } from "react-router-dom";
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
import { Users, Calendar, Mail, Clock } from "lucide-react";

const ChapterDetail = () => {
  const { chapterId } = useParams();

  // Mock data - in a real app, this would come from a database
  const chapterData: Record<string, any> = {
    uk: {
      name: "UK Chapter",
      location: "United Kingdom",
      status: "Active",
      members: 150,
      established: "2023",
      description:
        "The flagship chapter of Oyede Development Union, leading our diaspora activities with strong community engagement across England, Scotland, Wales, and Northern Ireland.",
      leader: "Chief John Oyede",
      email: "uk@oyedeunion.org",
      nextMeeting: "First Saturday of every month at 2:00 PM GMT",
      meetingLocation: "London Community Center, 123 High Street, London",
      leadership: [
        { name: "Chief John Oyede", position: "Chapter President" },
        { name: "Mrs. Sarah Akporhie", position: "Vice President" },
        { name: "Mr. David Efemena", position: "Secretary" },
        { name: "Mrs. Peace Okueh", position: "Treasurer" },
      ],
      projects: [
        "Oyede Secondary School Renovation Project",
        "Community Health Center Equipment Drive",
        "Annual Cultural Festival Organization",
        "Youth Education Scholarship Program",
      ],
      upcomingEvents: [
        {
          name: "Monthly General Meeting",
          date: "December 7, 2024",
          time: "2:00 PM",
        },
        {
          name: "Christmas Cultural Celebration",
          date: "December 21, 2024",
          time: "6:00 PM",
        },
        {
          name: "New Year Fundraising Gala",
          date: "January 15, 2025",
          time: "7:00 PM",
        },
      ],
    },
  };

  const chapter = chapterData[chapterId || ""] || chapterData.uk;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Forming":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-bold">
                  {chapter.name}
                </h1>
                <Badge className={`${getStatusColor(chapter.status)} text-sm`}>
                  {chapter.status}
                </Badge>
              </div>
              <p className="text-xl mb-2">{chapter.location}</p>
              <p className="text-lg opacity-90">{chapter.description}</p>
            </div>
            <div className="mt-6 md:mt-0">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100"
              >
                Join This Chapter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Chapter Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Chapter Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {chapter.members}
                      </div>
                      <div className="text-sm text-gray-600">Members</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {chapter.established}
                      </div>
                      <div className="text-sm text-gray-600">Established</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">4</div>
                      <div className="text-sm text-gray-600">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        12
                      </div>
                      <div className="text-sm text-gray-600">Events/Year</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Leadership Team */}
              <Card>
                <CardHeader>
                  <CardTitle>Leadership Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {chapter.leadership.map((leader: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center p-4 border rounded-lg"
                      >
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold">{leader.name}</div>
                          <div className="text-sm text-gray-600">
                            {leader.position}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ongoing Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Ongoing Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {chapter.projects.map((project: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact & Events */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">{chapter.leader}</div>
                      <div className="text-sm text-gray-600">
                        Chapter Leader
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="font-medium">{chapter.email}</div>
                      <div className="text-sm text-gray-600">Email</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Meeting Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle>Meeting Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">Regular Meetings</div>
                      <div className="text-sm text-gray-600">
                        {chapter.nextMeeting}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm text-gray-600">
                        {chapter.meetingLocation}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {chapter.upcomingEvents.map((event: any, index: number) => (
                      <div
                        key={index}
                        className="border-l-4 border-green-600 pl-4"
                      >
                        <div className="font-medium">{event.name}</div>
                        <div className="text-sm text-gray-600">
                          {event.date} at {event.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Join This Chapter
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Chapter Leader
                </Button>
                <Button variant="outline" className="w-full">
                  View Photo Gallery
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChapterDetail;
