import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChapterActions from "@/components/ChapterActions";
import { useChapters } from "@/hooks/useChapters";
import { Globe, Users, Calendar, Sparkles } from "lucide-react";

const Chapters = () => {
  const { data: chapters, isLoading } = useChapters();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading chapters...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-purple-600 to-green-800 text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/20 rounded-full blur-2xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="h-16 w-16 text-yellow-300 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Our Global Chapters
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100">
            Connecting Oyede indigenes worldwide through local chapters that preserve our culture and drive community development.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-lg">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <Users className="h-5 w-5 mr-2" />
              <span>5 Active Chapters</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Regular Meetings</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              <Sparkles className="h-5 w-5 mr-2" />
              <span>Global Network</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chapters Grid */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
              Join a Chapter Near You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each chapter serves as a local hub for cultural activities, community support, and development projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapters?.map((chapter) => (
              <ChapterActions key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Chapters;
