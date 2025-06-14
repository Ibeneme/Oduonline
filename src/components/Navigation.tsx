import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Menu,
  X,
  Home,
  Users,
  Calendar,
  Camera,
  Phone,
  Newspaper,
  LogOut,
  Shield,
  UserCog,
} from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        setUserRole(profile?.role || null);
      } else {
        setUserRole(null);
      }
    };

    fetchUserRole();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: Users },
    { name: "Vision & Mission", path: "/vision-mission", icon: Users },
    { name: "Chapters", path: "/chapters", icon: Users },
    { name: "Membership", path: "/membership", icon: Users },
    { name: "News", path: "/news", icon: Newspaper },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Gallery", path: "/gallery", icon: Camera },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span
                className={`font-bold bg-gradient-to-r from-green-600 to-purple-600 bg-clip-text text-transparent leading-tight ${
                  isMobile
                    ? "text-xs"
                    : "text-sm md:text-base lg:text-lg xl:text-xl"
                }`}
              >
                Oyede Development Union
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-purple-600 px-2 py-2 text-sm font-medium transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-2">
                {userRole === "super_admin" && (
                  <Link to="/admin">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Admin
                    </Button>
                  </Link>
                )}
                {userRole === "chapter_admin" && (
                  <Link to="/chapter-admin">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-300 text-green-600 hover:bg-green-50"
                    >
                      <UserCog className="h-4 w-4 mr-1" />
                      Chapter
                    </Button>
                  </Link>
                )}
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-green-600 to-purple-600 text-white">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-600 focus:outline-none focus:text-purple-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t max-h-96 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center text-gray-700 hover:text-purple-600 block px-3 py-2 text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.name}
              </Link>
            ))}

            {user ? (
              <div className="space-y-1 border-t pt-2">
                {userRole === "super_admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center text-purple-600 block px-3 py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="h-4 w-4 mr-3" />
                    Admin Panel
                  </Link>
                )}
                {userRole === "chapter_admin" && (
                  <Link
                    to="/chapter-admin"
                    className="flex items-center text-green-600 block px-3 py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserCog className="h-4 w-4 mr-3" />
                    Chapter Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="flex items-center text-red-600 block px-3 py-2 text-base font-medium w-full text-left"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center text-purple-600 block px-3 py-2 text-base font-medium border-t pt-2"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
