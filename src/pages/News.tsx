import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  created_at: string;
  published: boolean | null;
  author_id: string | null;
}

const News = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching news:", error);
        return;
      }

      setNewsItems(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Fundraising":
        return "bg-green-100 text-green-800";
      case "Chapter News":
        return "bg-blue-100 text-blue-800";
      case "Events":
        return "bg-purple-100 text-purple-800";
      case "Development":
        return "bg-orange-100 text-orange-800";
      case "Education":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const featuredNews = newsItems.length > 0 ? newsItems[0] : null;
  const regularNews = newsItems.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            News & Announcements
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Stay updated with the latest news, events, and developments from
            Oyede Development Union.
          </p>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Featured News
            </h2>
            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-4 mb-2">
                  <Badge className="bg-green-100 text-green-800">Latest</Badge>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(featuredNews.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <User className="h-4 w-4 mr-1" />
                    Admin Team
                  </div>
                </div>
                <CardTitle className="text-2xl">{featuredNews.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-700">
                  {featuredNews.excerpt ||
                    featuredNews.content.substring(0, 200) + "..."}
                </CardDescription>
                <button className="mt-4 text-green-600 hover:text-green-700 font-medium">
                  Read Full Article →
                </button>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Regular News */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Latest Updates
          </h2>

          {newsItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No news articles published yet.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularNews.map((item) => (
                  <Card
                    key={item.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          News
                        </Badge>
                        <span className="text-gray-500 text-xs">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-700 mb-4">
                        {item.excerpt || item.content.substring(0, 150) + "..."}
                      </CardDescription>
                      <div className="flex items-center text-gray-500 text-sm">
                        <User className="h-4 w-4 mr-1" />
                        Admin Team
                      </div>
                      <button className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm">
                        Read More →
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {newsItems.length > 0 && (
                <div className="text-center mt-12">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium">
                    Load More News
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;
