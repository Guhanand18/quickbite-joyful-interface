import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietary: string[];
  popular: boolean;
  customization?: {
    spiceLevel?: string[];
    addOns?: { name: string; price: number }[];
    specialInstructions?: boolean;
  };
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Avocado Toast",
    description: "Fresh avocado on sourdough bread with poached eggs",
    price: 599,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2",
    dietary: ["Vegetarian"],
    popular: true,
    customization: {
      spiceLevel: ["Mild", "Medium", "Spicy"],
      addOns: [
        { name: "Extra Egg", price: 50 },
        { name: "Extra Avocado", price: 80 }
      ],
      specialInstructions: true
    }
  },
  {
    id: 2,
    name: "Quinoa Bowl",
    description: "Mixed quinoa with roasted vegetables and tahini dressing",
    price: 699,
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    dietary: ["Vegan", "Gluten-Free"],
    popular: false,
  },
];

const Order = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks"];
  const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free"];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDietary =
      selectedDietary.length === 0 ||
      selectedDietary.some((diet) => item.dietary.includes(diet));
    return matchesCategory && matchesSearch && matchesDietary;
  });

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsCustomizing(true);
  };

  return (
    <div className="min-h-screen bg-neutral dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <h1 className="font-playfair text-4xl font-bold text-center mb-8 dark:text-white">
          Our Menu
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search meals..."
              className="pl-10 dark:bg-gray-800 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap dark:text-white"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {dietaryOptions.map((diet) => (
            <Button
              key={diet}
              variant={selectedDietary.includes(diet) ? "default" : "outline"}
              onClick={() =>
                setSelectedDietary((prev) =>
                  prev.includes(diet)
                    ? prev.filter((d) => d !== diet)
                    : [...prev, diet]
                )
              }
              className="dark:text-white"
            >
              {diet}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-playfair text-xl font-bold dark:text-white">
                    {item.name}
                  </h3>
                  {item.popular && (
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.dietary.map((diet) => (
                    <span
                      key={diet}
                      className="px-2 py-1 bg-neutral dark:bg-gray-700 rounded-full text-sm dark:text-white"
                    >
                      {diet}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-montserrat font-bold text-lg dark:text-white">
                    ₹{item.price}
                  </span>
                  <Button className="bg-primary hover:bg-primary/90">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Sheet open={isCustomizing} onOpenChange={setIsCustomizing}>
          <SheetContent side="right" className="w-full sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>{selectedItem?.name}</SheetTitle>
              <SheetDescription>{selectedItem?.description}</SheetDescription>
            </SheetHeader>
            
            {selectedItem?.customization && (
              <div className="mt-6 space-y-6">
                {selectedItem.customization.spiceLevel && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">Spice Level</h3>
                    <div className="flex gap-2">
                      {selectedItem.customization.spiceLevel.map((level) => (
                        <Button
                          key={level}
                          variant="outline"
                          className="flex-1"
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.customization.addOns && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">Add-ons</h3>
                    <div className="space-y-2">
                      {selectedItem.customization.addOns.map((addon) => (
                        <div
                          key={addon.name}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <span className="dark:text-white">{addon.name}</span>
                          <Button variant="outline">
                            + ₹{addon.price}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.customization.specialInstructions && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">Special Instructions</h3>
                    <Input
                      placeholder="Any special requests?"
                      className="w-full"
                    />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
                  <Button
                    className="w-full"
                    onClick={() => {
                      setIsCustomizing(false);
                      navigate('/checkout');
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Order;
