
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, ArrowLeft, X, Plus, Minus, Package, Heart, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import KioskLocationsBar from "@/components/KioskLocationsBar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietary: string[];
  popular: boolean;
  servingSize: string;
  locationIds?: number[];
  customization?: {
    spiceLevel?: string[];
    addOns?: { name: string; price: number }[];
    size?: { name: string; priceMultiplier: number }[];
    extras?: { name: string; price: number }[];
    specialInstructions?: boolean;
  };
}

interface CartItem extends MenuItem {
  quantity: number;
  selectedOptions: {
    spiceLevel?: string;
    addOns?: string[];
    size?: string;
    extras?: string[];
    specialInstructions?: string;
  };
  totalItemPrice: number;
}

// Updated menu items with more dishes and reduced prices
const allMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Avocado Toast",
    description: "Fresh avocado on sourdough bread with poached eggs",
    price: 399, // Reduced from 599
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2",
    dietary: ["Vegetarian"],
    popular: true,
    servingSize: "Serves 1 person",
    locationIds: [1, 3],
    customization: {
      spiceLevel: ["Mild", "Medium", "Spicy"],
      addOns: [
        { name: "Extra Egg", price: 40 },
        { name: "Extra Avocado", price: 60 }
      ],
      size: [
        { name: "Small", priceMultiplier: 0.8 },
        { name: "Regular", priceMultiplier: 1 },
        { name: "Large", priceMultiplier: 1.3 }
      ],
      extras: [
        { name: "Chili Flakes", price: 10 },
        { name: "Microgreens", price: 30 }
      ],
      specialInstructions: true
    }
  },
  {
    id: 2,
    name: "Quinoa Bowl",
    description: "Mixed quinoa with roasted vegetables and tahini dressing",
    price: 499, // Reduced from 699
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    dietary: ["Vegan", "Gluten-Free"],
    popular: false,
    servingSize: "Serves 1-2 people",
    locationIds: [1, 2, 4],
    customization: {
      addOns: [
        { name: "Grilled Tofu", price: 50 },
        { name: "Avocado", price: 60 }
      ],
      specialInstructions: true
    }
  },
  {
    id: 3,
    name: "Paneer Tikka Wrap",
    description: "Spiced paneer with bell peppers and mint chutney in whole wheat wrap",
    price: 349,
    category: "Lunch",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
    dietary: ["Vegetarian"],
    popular: true,
    servingSize: "Serves 1 person",
    locationIds: [1, 3],
    customization: {
      spiceLevel: ["Mild", "Medium", "Spicy", "Extra Spicy"],
      addOns: [
        { name: "Extra Paneer", price: 60 },
        { name: "Cheese", price: 30 }
      ],
      size: [
        { name: "Half", priceMultiplier: 0.7 },
        { name: "Regular", priceMultiplier: 1 },
        { name: "Jumbo", priceMultiplier: 1.5 }
      ],
      specialInstructions: true
    }
  },
  {
    id: 4,
    name: "Smoothie Bowl",
    description: "Açaí and berry smoothie topped with granola, banana and chia seeds",
    price: 299,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1501747315-124a0eaca060",
    dietary: ["Vegan"],
    popular: false,
    servingSize: "Serves 1 person",
    locationIds: [2, 4],
    customization: {
      addOns: [
        { name: "Extra Granola", price: 30 },
        { name: "Peanut Butter", price: 25 }
      ]
    }
  },
  {
    id: 5,
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato, served with coconut chutney and sambar",
    price: 199,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1617692855027-33b14f061079",
    dietary: ["Vegetarian", "Gluten-Free"],
    popular: true,
    servingSize: "Serves 1 person",
    locationIds: [1, 3, 4],
    customization: {
      spiceLevel: ["Mild", "Medium", "Spicy"],
      size: [
        { name: "Regular", priceMultiplier: 1 },
        { name: "Paper Dosa", priceMultiplier: 1.2 },
        { name: "Family Size", priceMultiplier: 1.8 }
      ],
      extras: [
        { name: "Extra Sambar", price: 30 },
        { name: "Extra Chutney", price: 20 }
      ],
      specialInstructions: true
    }
  },
  {
    id: 6,
    name: "Pesto Pasta",
    description: "Whole grain pasta with fresh basil pesto, cherry tomatoes and parmesan",
    price: 449,
    category: "Dinner",
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856",
    dietary: ["Vegetarian"],
    popular: false,
    servingSize: "Serves 1-2 people",
    locationIds: [2, 4],
    customization: {
      addOns: [
        { name: "Grilled Chicken", price: 80 },
        { name: "Extra Cheese", price: 40 }
      ],
      size: [
        { name: "Small", priceMultiplier: 0.8 },
        { name: "Regular", priceMultiplier: 1 },
        { name: "Family", priceMultiplier: 1.8 }
      ],
      specialInstructions: true
    }
  },
  {
    id: 7,
    name: "Fruit & Yogurt Parfait",
    description: "Greek yogurt layered with fresh seasonal fruits and honey granola",
    price: 249,
    category: "Breakfast",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777",
    dietary: ["Vegetarian", "Low-Fat"],
    popular: false,
    servingSize: "Serves 1 person",
    locationIds: [1, 2, 3, 4],
    customization: {
      addOns: [
        { name: "Chia Seeds", price: 20 },
        { name: "Mixed Nuts", price: 30 }
      ]
    }
  },
  {
    id: 8,
    name: "Protein Power Combo",
    description: "Grilled chicken breast with quinoa and steamed vegetables",
    price: 599,
    category: "Combos",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    dietary: ["High-Protein", "Low-Carb"],
    popular: true,
    servingSize: "Serves 1-2 people",
    locationIds: [2, 3],
    customization: {
      spiceLevel: ["Mild", "Medium", "Spicy"],
      addOns: [
        { name: "Avocado", price: 60 },
        { name: "Sweet Potato", price: 40 }
      ],
      specialInstructions: true
    }
  }
];

// Recent orders data
const recentOrders = [
  { id: 3, timestamp: new Date().getTime() - 24 * 60 * 60 * 1000 },
  { id: 5, timestamp: new Date().getTime() - 3 * 24 * 60 * 60 * 1000 }
];

// Special combo deals
const combos = [
  {
    id: 101,
    name: "Breakfast Bundle",
    description: "Avocado Toast + Fruit & Yogurt Parfait",
    items: [1, 7],
    price: 599, // Discounted price
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2",
    servingSize: "Serves 1-2 people"
  },
  {
    id: 102,
    name: "Lunch Power Duo",
    description: "Quinoa Bowl + Smoothie Bowl",
    items: [2, 4],
    price: 699, // Discounted price
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    servingSize: "Serves 2 people"
  }
];

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [locationId, setLocationId] = useState<number | null>(null);
  const [currentOptions, setCurrentOptions] = useState<{
    spiceLevel?: string;
    addOns?: string[];
    size?: string;
    extras?: string[];
    specialInstructions?: string;
  }>({
    addOns: [],
    extras: []
  });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const locationParam = params.get("location");
    if (locationParam) {
      setLocationId(parseInt(locationParam, 10));
    }
  }, [location]);

  const menuItems = allMenuItems.filter(item => 
    !locationId || !item.locationIds || item.locationIds.includes(locationId)
  );

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Combos"];
  const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "High-Protein", "Low-Carb", "Low-Fat"];

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

  const recentItems = recentOrders
    .map(order => menuItems.find(item => item.id === order.id))
    .filter(Boolean) as MenuItem[];

  const recommendedItems = menuItems.filter(item => item.popular).slice(0, 3);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setCurrentOptions({
      addOns: [],
      extras: []
    });
    setQuantity(1);
    setIsCustomizing(true);
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;
    
    // Calculate base price based on size selection
    let basePrice = selectedItem.price;
    if (selectedItem.customization?.size && currentOptions.size) {
      const selectedSize = selectedItem.customization.size.find(s => s.name === currentOptions.size);
      if (selectedSize) {
        basePrice = Math.round(selectedItem.price * selectedSize.priceMultiplier);
      }
    }
    
    // Calculate add-ons price
    let addOnsPrice = 0;
    if (currentOptions.addOns && currentOptions.addOns.length > 0 && selectedItem.customization?.addOns) {
      addOnsPrice = currentOptions.addOns.reduce((total, addon) => {
        const addOnItem = selectedItem.customization?.addOns?.find(a => a.name === addon);
        return total + (addOnItem?.price || 0);
      }, 0);
    }
    
    // Calculate extras price
    let extrasPrice = 0;
    if (currentOptions.extras && currentOptions.extras.length > 0 && selectedItem.customization?.extras) {
      extrasPrice = currentOptions.extras.reduce((total, extra) => {
        const extraItem = selectedItem.customization?.extras?.find(e => e.name === extra);
        return total + (extraItem?.price || 0);
      }, 0);
    }
    
    // Calculate total for this item
    const totalItemPrice = (basePrice + addOnsPrice + extrasPrice) * quantity;
    
    // Create cart item
    const cartItem: CartItem = {
      ...selectedItem,
      quantity,
      selectedOptions: { ...currentOptions },
      totalItemPrice
    };
    
    setCart(prev => [...prev, cartItem]);
    setIsCustomizing(false);
  };

  const handleCheckout = () => {
    // Pass cart information to checkout page
    navigate('/checkout', { state: { cart } });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalItemPrice, 0);
  };

  const toggleAddOn = (addon: string) => {
    setCurrentOptions(prev => {
      const addOns = prev.addOns || [];
      return {
        ...prev,
        addOns: addOns.includes(addon) 
          ? addOns.filter(a => a !== addon) 
          : [...addOns, addon]
      };
    });
  };

  const toggleExtra = (extra: string) => {
    setCurrentOptions(prev => {
      const extras = prev.extras || [];
      return {
        ...prev,
        extras: extras.includes(extra) 
          ? extras.filter(e => e !== extra) 
          : [...extras, extra]
      };
    });
  };

  return (
    <div className="min-h-screen bg-neutral dark:bg-gray-900">
      <Navbar />
      <KioskLocationsBar />
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

        <Tabs 
          defaultValue="all" 
          className="mb-8"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 md:w-[400px] mb-4">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="recent">Recent Orders</TabsTrigger>
            <TabsTrigger value="recommended">For You</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
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

            {selectedCategory === "Combos" || (selectedCategory === "All" && combos.length > 0) ? (
              <div className="mb-8">
                <h2 className="font-playfair text-2xl font-bold mb-4 dark:text-white flex items-center">
                  <Package className="mr-2 h-5 w-5 text-primary" />
                  Special Combos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {combos.map((combo) => (
                    <div
                      key={combo.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                      onClick={() => {
                        // Add combo items to cart directly
                        const comboItems = combo.items.map(id => menuItems.find(item => item.id === id))
                          .filter(Boolean) as MenuItem[];
                        
                        comboItems.forEach(item => {
                          const cartItem: CartItem = {
                            ...item,
                            quantity: 1,
                            selectedOptions: {},
                            totalItemPrice: item.price
                          };
                          setCart(prev => [...prev, cartItem]);
                        });
                      }}
                    >
                      <div className="relative">
                        <img
                          src={combo.image}
                          alt={combo.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-accent text-white px-2 py-1 rounded-md text-sm font-bold">
                          COMBO
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-playfair text-xl font-bold dark:text-white">
                          {combo.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {combo.description}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                          {combo.servingSize}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-montserrat font-bold text-lg dark:text-white">
                            ₹{combo.price}
                          </span>
                          <Button className="bg-primary hover:bg-primary/90">
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

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
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {item.description}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                      {item.servingSize}
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
          </TabsContent>
          
          <TabsContent value="recent">
            <div className="mb-6">
              <h2 className="font-playfair text-2xl font-bold mb-4 dark:text-white flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                Your Recent Orders
              </h2>
              
              {recentItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md text-sm">
                          Recent
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-playfair text-xl font-bold dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {item.description}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                          {item.servingSize}
                        </p>
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
              ) : (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
                  <p className="text-gray-600 dark:text-gray-300">
                    You haven't placed any orders recently.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="recommended">
            <div className="mb-6">
              <h2 className="font-playfair text-2xl font-bold mb-4 dark:text-white flex items-center">
                <Heart className="mr-2 h-5 w-5 text-primary" />
                Recommended For You
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded-md text-sm">
                        Recommended
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-playfair text-xl font-bold dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {item.description}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                        {item.servingSize}
                      </p>
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
            </div>
          </TabsContent>
        </Tabs>

        <Sheet open={isCustomizing} onOpenChange={setIsCustomizing}>
          <SheetContent side="right" className="w-full sm:w-[540px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{selectedItem?.name}</SheetTitle>
              <SheetDescription>{selectedItem?.description}</SheetDescription>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {selectedItem?.servingSize}
              </div>
            </SheetHeader>
            
            {selectedItem?.customization && (
              <div className="mt-6 space-y-6 pb-24">
                <div className="flex items-center justify-center mb-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-full"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 font-semibold text-xl dark:text-white">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {selectedItem.customization.size && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">Size</h3>
                    <div className="flex gap-2">
                      {selectedItem.customization.size.map((size) => (
                        <Button
                          key={size.name}
                          variant={currentOptions.size === size.name ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => setCurrentOptions(prev => ({...prev, size: size.name}))}
                        >
                          {size.name}
                          {size.priceMultiplier !== 1 && (
                            <span className="text-xs ml-1">
                              {size.priceMultiplier < 1 ? "-" : "+"}
                              {Math.abs(Math.round((size.priceMultiplier - 1) * 100))}%
                            </span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.customization.spiceLevel && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">Spice Level</h3>
                    <div className="flex gap-2 flex-wrap">
                      {selectedItem.customization.spiceLevel.map((level) => (
                        <Button
                          key={level}
                          variant={currentOptions.spiceLevel === level ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => setCurrentOptions(prev => ({...prev, spiceLevel: level}))}
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
                          <Button 
                            variant={currentOptions.addOns?.includes(addon.name) ? "default" : "outline"}
                            onClick={() => toggleAddOn(addon.name)}
                          >
                            {currentOptions.addOns?.includes(addon.name) ? "Added" : `+ ₹${addon.price}`}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.customization.extras && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">Extras</h3>
                    <div className="space-y-2">
                      {selectedItem.customization.extras.map((extra) => (
                        <div
                          key={extra.name}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <span className="dark:text-white">{extra.name}</span>
                          <Button 
                            variant={currentOptions.extras?.includes(extra.name) ? "default" : "outline"}
                            onClick={() => toggleExtra(extra.name)}
                          >
                            {currentOptions.extras?.includes(extra.name) ? "Added" : `+ ₹${extra.price}`}
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
                      value={currentOptions.specialInstructions || ""}
                      onChange={e => setCurrentOptions(prev => ({...prev, specialInstructions: e.target.value}))}
                    />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold dark:text-white">Total</span>
                    <span className="font-bold text-xl dark:text-white">
                      ₹{(() => {
                        // Calculate price based on selected options
                        let basePrice = selectedItem.price;
                        
                        // Adjust for size
                        if (selectedItem.customization.size && currentOptions.size) {
                          const selectedSize = selectedItem.customization.size.find(s => s.name === currentOptions.size);
                          if (selectedSize) {
                            basePrice = Math.round(basePrice * selectedSize.priceMultiplier);
                          }
                        }
                        
                        // Add price of addons
                        let addOnsPrice = 0;
                        if (currentOptions.addOns && selectedItem.customization.addOns) {
                          addOnsPrice = currentOptions.addOns.reduce((total, addon) => {
                            const addOnItem = selectedItem.customization?.addOns?.find(a => a.name === addon);
                            return total + (addOnItem?.price || 0);
                          }, 0);
                        }
                        
                        // Add price of extras
                        let extrasPrice = 0;
                        if (currentOptions.extras && selectedItem.customization.extras) {
                          extrasPrice = currentOptions.extras.reduce((total, extra) => {
                            const extraItem = selectedItem.customization?.extras?.find(e => e.name === extra);
                            return total + (extraItem?.price || 0);
                          }, 0);
                        }
                        
                        // Multiply by quantity
                        return (basePrice + addOnsPrice + extrasPrice) * quantity;
                      })()}
                    </span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>

        {/* Cart floating button */}
        {cart.length > 0 && (
          <div className="fixed bottom-8 right-8 z-40">
            <div 
              className="relative bg-primary text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-primary/90 transition-colors"
              onClick={() => navigate('/checkout', { state: { cart } })}
            >
              <div className="absolute -top-2 -right-2 bg-accent text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                {cart.length}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">₹{getTotalPrice()}</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
