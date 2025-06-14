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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Contact as ContactIcon, Calendar } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Header Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get in touch with us. We'd love to hear from you and answer any
            questions you may have.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="chapter">Chapter/Location</Label>
                    <Input
                      id="chapter"
                      placeholder="Which chapter are you interested in?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter message subject" />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your message..."
                    />
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* General Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-green-600" />
                    General Inquiries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>
                      <strong>Email:</strong> info@oyedeunion.org
                    </p>
                    <p>
                      <strong>Response Time:</strong> Within 24-48 hours
                    </p>
                    <p>
                      <strong>Languages:</strong> English, Urhobo
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Chapter Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ContactIcon className="h-5 w-5 mr-2 text-green-600" />
                    Chapter Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold">UK Chapter</p>
                    <p className="text-sm text-gray-600">uk@oyedeunion.org</p>
                    <p className="text-sm text-gray-600">
                      Chief John Oyede - Chapter President
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Canada Chapter</p>
                    <p className="text-sm text-gray-600">
                      canada@oyedeunion.org
                    </p>
                    <p className="text-sm text-gray-600">
                      Mrs. Grace Akporhie - Chapter President
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">USA Chapter</p>
                    <p className="text-sm text-gray-600">usa@oyedeunion.org</p>
                    <p className="text-sm text-gray-600">
                      Dr. Paul Okueh - Chapter President
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Nigeria HQ</p>
                    <p className="text-sm text-gray-600">
                      nigeria@oyedeunion.org
                    </p>
                    <p className="text-sm text-gray-600">
                      HRM Ovie Solomon Akporhie
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Office Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-green-600" />
                    Office Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>
                      <strong>UK Office:</strong>
                    </p>
                    <p className="text-sm text-gray-600">
                      London Community Center
                      <br />
                      123 High Street
                      <br />
                      London, UK
                    </p>
                    <p>
                      <strong>Meeting Times:</strong>
                    </p>
                    <p className="text-sm text-gray-600">
                      First Saturday of every month
                      <br />
                      2:00 PM - 5:00 PM GMT
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Connect With Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <span className="mr-2">📘</span> Facebook Group
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <span className="mr-2">💬</span> WhatsApp Community
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <span className="mr-2">📱</span> Telegram Channel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
