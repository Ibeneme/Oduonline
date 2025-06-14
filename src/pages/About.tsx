import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Oyede Development Union
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Learn more about our mission to unite Oyede people worldwide and
            develop our homeland.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Oyede Development Union was founded to address the growing need
                for unity and coordinated development efforts among Oyede
                indigenes living in the diaspora. As more of our people settled
                in various countries around the world, we recognized the
                importance of maintaining our cultural identity while
                contributing to the development of our homeland.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                The Union represents Oyede people worldwide, with the UK branch
                currently leading our activities and outreach efforts. We serve
                as a bridge between our diaspora communities and Oyede town in
                Delta State, Nigeria, ensuring that distance does not diminish
                our connection to our roots.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
              <span className="text-gray-500">
                Historical Image Placeholder
              </span>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-green-600">Unity</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Bringing together all Oyede indigenes regardless of
                    location, fostering a sense of belonging and shared purpose
                    in our global community.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-green-600">
                    Cultural Heritage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Preserving and promoting our rich Urhobo culture,
                    traditions, and values while adapting to modern global
                    realities.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-green-600">Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Mobilizing resources, skills, and expertise for sustainable
                    development projects that benefit Oyede town and its people.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Impact Section */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  500+
                </div>
                <div className="text-gray-700">Global Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">5</div>
                <div className="text-gray-700">Active Chapters</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  10+
                </div>
                <div className="text-gray-700">Development Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ₦50M+
                </div>
                <div className="text-gray-700">Funds Raised</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
