import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="font-playfair font-bold text-2xl text-primary">QuickBite</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="font-montserrat text-gray-600 hover:text-primary transition-colors">Home</a>
            <a href="#menu" className="font-montserrat text-gray-600 hover:text-primary transition-colors">Menu</a>
            <a href="#how-it-works" className="font-montserrat text-gray-600 hover:text-primary transition-colors">How It Works</a>
            <a href="#contact" className="font-montserrat text-gray-600 hover:text-primary transition-colors">Contact</a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-montserrat text-gray-600 hover:text-primary hover:bg-gray-50"
              >
                Home
              </a>
              <a
                href="#menu"
                className="block px-3 py-2 rounded-md text-base font-montserrat text-gray-600 hover:text-primary hover:bg-gray-50"
              >
                Menu
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-2 rounded-md text-base font-montserrat text-gray-600 hover:text-primary hover:bg-gray-50"
              >
                How It Works
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 rounded-md text-base font-montserrat text-gray-600 hover:text-primary hover:bg-gray-50"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;