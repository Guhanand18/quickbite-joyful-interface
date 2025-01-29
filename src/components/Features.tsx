import { Leaf, Clock, ThumbsUp } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: "Fresh Ingredients",
      description: "We use only the freshest, locally-sourced ingredients in all our meals.",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Quick Pickup",
      description: "Your order will be ready for pickup in 15 minutes or less.",
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-primary" />,
      title: "Quality Guaranteed",
      description: "Satisfaction guaranteed with every order or your money back.",
    },
  ];

  return (
    <div className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-neutral dark:bg-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-playfair font-semibold text-xl mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="font-montserrat text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;