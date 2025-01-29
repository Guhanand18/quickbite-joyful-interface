import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-neutral dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          <div>
            <h3 className="font-playfair font-bold text-2xl text-primary dark:text-white mb-4">
              QuickBite
            </h3>
            <p className="font-montserrat text-gray-600 dark:text-gray-300">
              Fresh, healthy meals ready for pickup in minutes.
            </p>
          </div>
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="font-montserrat text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="font-montserrat text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="font-montserrat text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="font-montserrat text-gray-600 dark:text-gray-300">123 Food Street</li>
              <li className="font-montserrat text-gray-600 dark:text-gray-300">New York, NY 10001</li>
              <li className="font-montserrat text-gray-600 dark:text-gray-300">contact@quickbite.com</li>
              <li className="font-montserrat text-gray-600 dark:text-gray-300">(555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h4 className="font-playfair font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                <Facebook />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                <Twitter />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                <Instagram />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="font-montserrat text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} QuickBite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;