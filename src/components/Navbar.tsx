import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="font-playfair text-2xl font-bold text-primary dark:text-white">
              QuickBite
            </span>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="dark:text-white">Home</Button>
              <Button variant="ghost" className="dark:text-white">Menu</Button>
              <Button variant="ghost" className="dark:text-white">Locations</Button>
              <Button variant="ghost" className="dark:text-white">Contact</Button>
              <Button variant="default">Order Now</Button>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;