import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div className="pt-16 bg-neutral dark:bg-gray-900">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Healthy & Fresh
              </span>
            </div>
            <h1 className="font-playfair font-bold text-4xl md:text-6xl leading-tight mb-6 text-gray-900 dark:text-white">
              Fresh & Healthy Food
              <br />
              <span className="text-primary dark:text-primary/90">Delivered Fast</span>
            </h1>
            <p className="font-montserrat text-gray-600 dark:text-gray-300 text-lg mb-8">
              Delicious meals made with fresh ingredients, ready for pickup at your convenience.
            </p>
            <button className="bg-accent hover:bg-accent/90 text-white font-montserrat font-semibold px-8 py-3 rounded-md transition-all hover:scale-105 flex items-center gap-2 group">
              Order Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="md:w-1/2 transform hover:scale-105 transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
              alt="Healthy meal"
              className="rounded-lg shadow-lg w-full h-[400px] object-cover hover:shadow-xl transition-shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;