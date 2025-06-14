import { Eye, Target, Heart, Globe, Users, Sparkles } from "lucide-react";

const VisionIllustration = () => {
  return (
    <div className="relative w-full h-80 bg-gradient-to-br from-green-100 via-purple-100 to-blue-100 rounded-2xl overflow-hidden shadow-2xl">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-4 right-4 w-24 h-24 bg-purple-300/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-32 h-32 bg-green-300/30 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl"></div>
      </div>

      {/* Central Vision Symbol */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Main Eye Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
            <Eye className="h-12 w-12 text-white" />
          </div>

          {/* Orbiting Icons */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce delay-100">
            <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
          </div>

          <div className="absolute top-1/2 -right-16 transform -translate-y-1/2 animate-pulse">
            <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
          </div>

          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce delay-300">
            <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>

          <div className="absolute top-1/2 -left-16 transform -translate-y-1/2 animate-pulse delay-200">
            <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-8 left-8 animate-float">
        <Sparkles className="h-6 w-6 text-purple-500" />
      </div>
      <div className="absolute bottom-8 right-8 animate-float delay-1000">
        <Sparkles className="h-5 w-5 text-green-500" />
      </div>
      <div className="absolute top-16 right-16 animate-float delay-500">
        <Sparkles className="h-4 w-4 text-blue-500" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
    </div>
  );
};

export default VisionIllustration;
