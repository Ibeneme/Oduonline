import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, Calendar, Newspaper, Contact, MapPin, Heart, Target, Sparkles, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  created_at: string;
  published: boolean | null;
}

const Index = () => {
  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedNews();
  }, []);

  const fetchFeaturedNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching news:', error);
        return;
      }

      setFeaturedNews(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Main Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-purple-600 to-green-800 text-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-green-400/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Sparkles className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-yellow-300 animate-pulse" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent leading-tight">
              Uniting Oyede Sons and Daughters
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-100 px-2 max-w-4xl mx-auto">
              Together for Progress - Promoting unity, culture, and development for Oyede at home and abroad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <Button size="lg" asChild className="w-full sm:w-auto bg-white text-purple-600 hover:bg-purple-50 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Link to="/chapters">Join Our Community</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-purple-600 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Link to="/membership">Become a Member (Free)</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* News & Announcements Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-white via-purple-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
              News & Announcements
            </h2>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-green-600 to-purple-600 mx-auto mb-6 sm:mb-8 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest developments, events, and announcements from our community
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : featuredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
              {featuredNews.map((news) => (
                <Card key={news.id} className="hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Newspaper className="h-4 w-4 text-purple-600" />
                        <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                          Latest
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(news.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="text-green-700 text-lg leading-tight line-clamp-2">
                      {news.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {news.excerpt || news.content.substring(0, 120) + '...'}
                    </CardDescription>
                    <Button size="sm" asChild className="w-full bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700">
                      <Link to="/news">Read More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-6">No news articles available at the moment</p>
              <Button asChild className="bg-gradient-to-r from-green-600 to-purple-600">
                <Link to="/news">View All News</Link>
              </Button>
            </div>
          )}
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="border-purple-300 text-purple-600 hover:bg-purple-50">
              <Link to="/news">View All News & Announcements</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
              About Oyede Development Union
            </h2>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-green-600 to-purple-600 mx-auto mb-6 sm:mb-8 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed px-2">
                Oyede Development Union is a global platform connecting all sons and daughters of Oyede, 
                especially those living outside Nigeria. While the Union represents Oyede people worldwide, 
                the UK branch is currently at the forefront of our activities and outreach.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed px-2">
                The Union is dedicated to fostering unity among our people, preserving our cultural values, 
                and mobilizing resources and talents for the sustainable development of Oyede town in Delta State, Nigeria.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 px-2">
                <Button asChild className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Link to="/about">Learn More About Us</Link>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto border-purple-300 text-purple-600 hover:bg-purple-50">
                  <Link to="/auth">Join Today</Link>
                </Button>
              </div>
            </div>
            <div className="relative order-1 lg:order-2 px-4 sm:px-0">
              <div 
                className="bg-gradient-to-br from-green-100 to-purple-100 rounded-2xl h-64 sm:h-80 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("/lovable-uploads/14f6aa8c-2ad4-4c3b-a50e-a33ec1634836.png")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="text-center p-6 sm:p-8 bg-black/40 rounded-xl backdrop-blur-sm">
                  <Heart className="h-16 w-16 sm:h-20 sm:w-20 text-white mx-auto mb-4" />
                  <p className="text-white font-semibold text-base sm:text-lg">Unity • Culture • Development</p>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-yellow-300 rounded-full opacity-80 animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-purple-400 rounded-full opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
              Our Community Features
            </h2>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-green-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Card className="text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-4 p-3 sm:p-4 bg-gradient-to-br from-green-100 to-purple-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                  <Users className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600" />
                </div>
                <CardTitle className="text-green-700 text-lg sm:text-xl">Global Chapters</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm sm:text-base">
                  Connect with Oyede communities across UK, Canada, USA, Germany and more.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-4 p-3 sm:p-4 bg-gradient-to-br from-purple-100 to-green-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                  <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                </div>
                <CardTitle className="text-purple-700 text-lg sm:text-xl">Cultural Events</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm sm:text-base">
                  Participate in cultural celebrations and community gatherings worldwide.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-4 p-3 sm:p-4 bg-gradient-to-br from-green-100 to-purple-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                  <Newspaper className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600" />
                </div>
                <CardTitle className="text-green-700 text-lg sm:text-xl">Community News</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm sm:text-base">
                  Stay updated with the latest news and developments from Oyede and diaspora.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-4 p-3 sm:p-4 bg-gradient-to-br from-purple-100 to-green-100 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                  <Contact className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                </div>
                <CardTitle className="text-purple-700 text-lg sm:text-xl">Support Network</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-sm sm:text-base">
                  Access mutual support and networking opportunities within our community.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-green-600 via-purple-600 to-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-green-400/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Target className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-yellow-300 mx-auto mb-4 sm:mb-6 animate-pulse" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto text-purple-100 px-2">
            Become part of a vibrant global network of Oyede indigenes working together for progress and development. Membership is completely free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <Button size="lg" asChild className="w-full sm:w-auto bg-white text-purple-600 hover:bg-purple-50 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <Link to="/membership">Join Today (Free)</Link>
            </Button>
            <Button size="lg" asChild variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-purple-600 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
