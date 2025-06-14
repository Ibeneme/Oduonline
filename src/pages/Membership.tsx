import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCreateMember } from "@/hooks/useMembers";
import { useChapters } from "@/hooks/useChapters";
import { CheckCircle, Heart, Users, Globe, Sparkles } from "lucide-react";

const Membership = () => {
  const [searchParams] = useSearchParams();
  const preSelectedChapter = searchParams.get("chapter");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    address: "",
    country: "",
    occupation: "",
    interests: "",
    chapter_id: preSelectedChapter || "",
  });

  const { mutate: createMember, isPending } = useCreateMember();
  const { data: chapters } = useChapters();

  // Update chapter_id if pre-selected
  useEffect(() => {
    if (preSelectedChapter && !formData.chapter_id) {
      setFormData((prev) => ({ ...prev, chapter_id: preSelectedChapter }));
    }
  }, [preSelectedChapter, formData.chapter_id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    createMember(formData);
  };

  const benefits = [
    "Connect with Oyede indigenes worldwide",
    "Access to exclusive community events",
    "Networking opportunities across chapters",
    "Cultural preservation initiatives",
    "Development project participation",
    "Monthly newsletters and updates",
    "Mentorship and support programs",
    "Free access to all community resources",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-purple-600 to-green-800 text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-16 w-16 text-yellow-300 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Join Our Community
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100">
            Become part of the global Oyede family. Membership is completely
            free and comes with amazing benefits.
          </p>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-purple-500 rounded-full text-white font-semibold text-lg shadow-2xl">
            <Sparkles className="h-5 w-5 mr-2" />
            100% FREE MEMBERSHIP
          </div>
        </div>
      </section>

      <div className="flex-1 py-16 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Membership Benefits */}
            <div className="space-y-8">
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Users className="h-8 w-8 text-purple-600 mr-3" />
                    <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                      Membership Benefits
                    </CardTitle>
                  </div>
                  <CardDescription className="text-lg text-gray-600">
                    Join thousands of Oyede indigenes worldwide and enjoy these
                    exclusive benefits.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-purple-50 transition-all duration-300"
                      >
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-green-100 to-purple-100">
                <CardContent className="p-8 text-center">
                  <Globe className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-700 mb-2">
                    Global Community
                  </h3>
                  <p className="text-gray-700">
                    Connect with chapters in UK, Canada, USA, Germany, and
                    Nigeria. Our community spans continents but shares one
                    heart.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Membership Form */}
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent">
                  Free Membership Application
                </CardTitle>
                <CardDescription>
                  Fill out this form to join our community. All fields marked
                  with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name *</Label>
                      <Input
                        id="first_name"
                        value={formData.first_name}
                        onChange={(e) =>
                          handleInputChange("first_name", e.target.value)
                        }
                        className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last Name *</Label>
                      <Input
                        id="last_name"
                        value={formData.last_name}
                        onChange={(e) =>
                          handleInputChange("last_name", e.target.value)
                        }
                        className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date_of_birth">Date of Birth</Label>
                      <Input
                        id="date_of_birth"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(e) =>
                          handleInputChange("date_of_birth", e.target.value)
                        }
                        className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country/Region *</Label>
                      <Input
                        id="country"
                        value={formData.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chapter">Preferred Chapter</Label>
                      <Select
                        value={formData.chapter_id}
                        onValueChange={(value) =>
                          handleInputChange("chapter_id", value)
                        }
                      >
                        <SelectTrigger className="border-gray-200 focus:border-purple-400 focus:ring-purple-400">
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      value={formData.occupation}
                      onChange={(e) =>
                        handleInputChange("occupation", e.target.value)
                      }
                      className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interests">Interests & Skills</Label>
                    <Textarea
                      id="interests"
                      value={formData.interests}
                      onChange={(e) =>
                        handleInputChange("interests", e.target.value)
                      }
                      placeholder="Tell us about your interests, skills, or how you'd like to contribute to the community..."
                      className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-white py-3 text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                    disabled={isPending}
                  >
                    {isPending
                      ? "Submitting Application..."
                      : "Join Our Community (Free)"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Membership;
