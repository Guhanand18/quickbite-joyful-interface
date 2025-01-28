const PopularMeals = () => {
  const meals = [
    {
      name: "Mediterranean Bowl",
      description: "Fresh quinoa, hummus, falafel, and mixed greens",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    },
    {
      name: "Asian Fusion Bowl",
      description: "Brown rice, tofu, vegetables, and sesame dressing",
      price: "$13.99",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    },
    {
      name: "Protein Power Bowl",
      description: "Grilled chicken, sweet potatoes, and kale",
      price: "$14.99",
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
    },
  ];

  return (
    <div id="menu" className="py-20 bg-neutral">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair font-bold text-3xl md:text-4xl text-center mb-12">
          Popular Meals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {meals.map((meal, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-playfair font-semibold text-xl mb-2">{meal.name}</h3>
                <p className="font-montserrat text-gray-600 mb-4">{meal.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-montserrat font-semibold text-primary">{meal.price}</span>
                  <button className="bg-accent hover:bg-accent/90 text-white font-montserrat px-4 py-2 rounded-md transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularMeals;