
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";
import { LogIn, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is signed in from localStorage
  useState(() => {
    const preferences = localStorage.getItem("dietaryPreferences");
    const cuisine = localStorage.getItem("cuisinePreference");
    if (preferences || cuisine) {
      setIsSignedIn(true);
    }
  });

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSignOut = () => {
    localStorage.removeItem("dietaryPreferences");
    localStorage.removeItem("cuisinePreference");
    setIsSignedIn(false);
    navigate("/");
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
              <Button variant="ghost" className="text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary dark:hover:bg-gray-800">
                Contact
              </Button>
              {isSignedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" alt="Profile" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <DropdownMenuLabel className="text-gray-700 dark:text-gray-200">My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleProfileClick}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/orders")}>
                      <span>My Orders</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
