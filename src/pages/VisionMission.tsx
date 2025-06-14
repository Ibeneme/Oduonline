import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VisionIllustration from "@/components/VisionIllustration";
import {
  Eye,
  Target,
  Heart,
  Globe,
  Users,
  Lightbulb,
  Award,
  Handshake,
} from "lucide-react";

const VisionMission = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/20 rounded-full blur-2xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Eye className="h-16 w-16 text-yellow-300 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Our Vision & Mission
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100">
            Empowering our community through unity, development, and cultural
            preservation
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Eye className="h-12 w-12 text-purple-600 mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                  Our Vision
                </h2>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                To be a unified global community of Oyede indigenes that serves
                as a beacon of progress, cultural preservation, and sustainable
                development while maintaining our rich heritage and fostering
                prosperity for current and future generations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-gradient-to-br from-green-50 to-purple-50 rounded-lg">
                  <Globe className="h-8 w-8 text-green-600 mr-3" />
                  <span className="font-semibold text-gray-800">
                    Global Unity
                  </span>
                </div>
                <div className="flex items-center p-4 bg-gradient-to-br from-purple-50 to-green-50 rounded-lg">
                  <Heart className="h-8 w-8 text-purple-600 mr-3" />
                  <span className="font-semibold text-gray-800">
                    Cultural Heritage
                  </span>
                </div>
              </div>
            </div>
            <div>
              <VisionIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Target className="h-12 w-12 text-green-600 mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                Our Mission
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We are committed to building bridges that connect our people
              across continents while driving meaningful development in our
              homeland.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Users className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community Building
              </h3>
              <p className="text-gray-700">
                Foster strong relationships among Oyede indigenes worldwide
                through regular gatherings, cultural events, and collaborative
                initiatives.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-green-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Lightbulb className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Development Projects
              </h3>
              <p className="text-gray-700">
                Implement sustainable development projects in education,
                healthcare, infrastructure, and economic empowerment within our
                community.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Award className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Cultural Preservation
              </h3>
              <p className="text-gray-700">
                Preserve and promote our traditional values, customs, language,
                and practices for future generations through documentation and
                education.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-green-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Handshake className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Youth Empowerment
              </h3>
              <p className="text-gray-700">
                Provide mentorship, scholarships, and career development
                opportunities to empower the next generation of leaders.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Globe className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Global Networking
              </h3>
              <p className="text-gray-700">
                Create professional and social networks that benefit our members
                through business opportunities and knowledge sharing.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-green-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Heart className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Welfare Support
              </h3>
              <p className="text-gray-700">
                Provide mutual support and assistance to members in times of
                need, celebrating achievements and supporting during challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-green-600 via-purple-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Building Our Future
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Together, we can achieve our vision and fulfill our mission. Be part
            of the change you want to see in our community.
          </p>
          <a
            href="/membership"
            className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-colors shadow-2xl transform hover:scale-105 duration-300"
          >
            <Users className="h-5 w-5 mr-2" />
            Become a Member Today
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VisionMission;
