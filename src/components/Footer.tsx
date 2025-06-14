import { Link } from "react-router-dom";
import { Mail, Calendar } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-green-600 rounded-full mr-3"></div>
              <span className="font-bold text-xl">Oyede Development Union</span>
            </div>
            <p className="text-gray-300 mb-4">
              Uniting Oyede Sons and Daughters in the Diaspora – Together for
              Progress. Promoting unity, culture, and development for Oyede at
              home and abroad.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                WhatsApp
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Telegram
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/vision-mission"
                  className="text-gray-300 hover:text-white"
                >
                  Vision & Mission
                </Link>
              </li>
              <li>
                <Link to="/chapters" className="text-gray-300 hover:text-white">
                  Chapters
                </Link>
              </li>
              <li>
                <Link
                  to="/membership"
                  className="text-gray-300 hover:text-white"
                >
                  Membership
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-gray-300">info@oyedeunion.org</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-gray-300">Est. 2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Oyede Development Union. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
