import { ShoppingCart, Clock3, Utensils } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <ShoppingCart className="w-12 h-12 text-primary" />,
      title: "Place Your Order",
      description: "Choose your favorite meals from our menu",
    },
    {
      icon: <Clock3 className="w-12 h-12 text-primary" />,
      title: "Wait 15 Minutes",
      description: "We prepare your order fresh and fast",
    },
    {
      icon: <Utensils className="w-12 h-12 text-primary" />,
      title: "Pick Up & Enjoy",
      description: "Collect your order from our nearest location",
    },
  ];

  return (
    <div id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair font-bold text-3xl md:text-4xl text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-6 flex justify-center">{step.icon}</div>
              <h3 className="font-playfair font-semibold text-xl mb-2">{step.title}</h3>
              <p className="font-montserrat text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;