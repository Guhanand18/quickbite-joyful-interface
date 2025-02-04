import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="font-playfair text-2xl font-bold text-primary hover:text-primary/90 transition-colors dark:text-white cursor-pointer" onClick={() => navigate("/")}>
              QuickBite
            </span>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary dark:hover:bg-gray-800" onClick={() => navigate("/")}>
                Home
              </Button>
              <Button variant="ghost" className="text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary dark:hover:bg-gray-800" onClick={() => navigate("/locations")}>
                Locations
              </Button>
              <Button variant="ghost" className="text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary dark:hover:bg-gray-800">
                Contact
              </Button>
              {isSignedIn ? (
                <Button variant="ghost" className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-gray-700 dark:text-gray-200">John Doe</span>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-white dark:text-white"
                  onClick={handleSignInClick}
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
              )}
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;