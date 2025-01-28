import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="pt-16 bg-neutral">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="font-playfair font-bold text-4xl md:text-6xl leading-tight mb-6">
              Fresh & Healthy Food
              <br />
              <span className="text-primary">Delivered Fast</span>
            </h1>
            <p className="font-montserrat text-gray-600 text-lg mb-8">
              Delicious meals made with fresh ingredients, ready for pickup at your convenience.
            </p>
            <button className="bg-accent hover:bg-accent/90 text-white font-montserrat font-semibold px-8 py-3 rounded-md transition-colors flex items-center gap-2 group">
              Order Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
              alt="Healthy meal"
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;