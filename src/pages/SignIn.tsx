import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle, FaApple } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const dietaryPreferences = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "high-protein", label: "High-Protein" },
  { id: "low-carb", label: "Low-Carb" },
  { id: "low-fat", label: "Low-Fat" },
];

const cuisinePreferences = [
  "All",
  "Indian",
  "Continental",
  "Asian",
  "Mediterranean",
  "Italian",
  "Mexican",
];

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [cuisine, setCuisine] = useState<string>("All");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [userType, setUserType] = useState<"customer" | "admin">("customer");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userType === "admin") {
      // Admin login logic
      if (hotelId && password) {
        // In a real app, verify admin credentials from a secure source
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("hotelId", hotelId);
        
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard.",
        });
        
        navigate("/admin");
        return;
      } else {
        toast({
          title: "Login failed",
          description: "Please provide both hotel ID and password.",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Customer login/signup logic
    localStorage.setItem("dietaryPreferences", JSON.stringify(selectedDietary));
    localStorage.setItem("cuisinePreference", cuisine);
    localStorage.setItem("userEmail", email);
    
    toast({
      title: isSignUp ? "Account created!" : "Welcome back!",
      description: "You have successfully signed in.",
    });
    
    navigate("/");
  };

  const handleSocialLogin = (provider: string) => {
    // Simulate social login and show preferences
    setShowPreferences(true);
    toast({
      title: `${provider} authentication successful`,
      description: "Please complete your food preferences.",
    });
  };

  const savePreferences = () => {
    localStorage.setItem("dietaryPreferences", JSON.stringify(selectedDietary));
    localStorage.setItem("cuisinePreference", cuisine);
    localStorage.setItem("userEmail", "social-login@example.com");
    
    toast({
      title: "Preferences saved",
      description: "Your food preferences have been saved.",
    });
    
    navigate("/");
  };

  const toggleDietaryPreference = (id: string) => {
    setSelectedDietary(current => 
      current.includes(id) 
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  };

  // If showing only preferences after social login
  if (showPreferences) {
    return (
      <div className="min-h-screen bg-neutral dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="font-playfair text-3xl font-bold text-center mb-8 dark:text-white">
              Your Food Preferences
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">Dietary Preferences</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Select all that apply. We'll customize your menu based on these preferences.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {dietaryPreferences.map((preference) => (
                    <div key={preference.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={preference.id} 
                        checked={selectedDietary.includes(preference.id)}
                        onCheckedChange={() => toggleDietaryPreference(preference.id)}
                      />
                      <Label 
                        htmlFor={preference.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
                      >
                        {preference.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium dark:text-white mb-2">Preferred Cuisine</h3>
                <Select value={cuisine} onValueChange={setCuisine}>
                  <SelectTrigger className="w-full bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                    {cuisinePreferences.map((cuisineOption) => (
                      <SelectItem key={cuisineOption} value={cuisineOption}>
                        {cuisineOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90" onClick={savePreferences}>
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="font-playfair text-3xl font-bold text-center mb-8 dark:text-white">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          
          <Tabs defaultValue="customer" onValueChange={(value) => setUserType(value as "customer" | "admin")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            
            <TabsContent value="customer">
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <Input
                    type="text"
                    placeholder="Username"
                    className="w-full dark:bg-gray-700 dark:text-white"
                  />
                )}
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full dark:bg-gray-700 dark:text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {isSignUp && (
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full dark:bg-gray-700 dark:text-white"
                  />
                )}
                <Input
                  type="password"
                  placeholder="Password"
                  className="w-full dark:bg-gray-700 dark:text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {isSignUp && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <h3 className="text-lg font-medium dark:text-white mb-2">Dietary Preferences</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        Select all that apply. We'll customize your menu based on these preferences.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {dietaryPreferences.map((preference) => (
                          <div key={preference.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={preference.id} 
                              checked={selectedDietary.includes(preference.id)}
                              onCheckedChange={() => toggleDietaryPreference(preference.id)}
                            />
                            <Label 
                              htmlFor={preference.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
                            >
                              {preference.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium dark:text-white mb-2">Preferred Cuisine</h3>
                      <Select value={cuisine} onValueChange={setCuisine}>
                        <SelectTrigger className="w-full bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                          <SelectValue placeholder="Select cuisine" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
                          {cuisinePreferences.map((cuisineOption) => (
                            <SelectItem key={cuisineOption} value={cuisineOption}>
                              {cuisineOption}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-primary hover:bg-primary/90">
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
                
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-accent hover:underline dark:text-accent"
                  >
                    {isSignUp
                      ? "Already have an account? Sign in"
                      : "Don't have an account? Sign up"}
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="w-full dark:text-white dark:hover:bg-gray-700"
                    onClick={() => handleSocialLogin("Google")}
                  >
                    <FaGoogle className="mr-2" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full dark:text-white dark:hover:bg-gray-700"
                    onClick={() => handleSocialLogin("Apple")}
                  >
                    <FaApple className="mr-2" />
                    Apple
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="admin">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Hotel ID"
                  className="w-full dark:bg-gray-700 dark:text-white"
                  value={hotelId}
                  onChange={(e) => setHotelId(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  className="w-full dark:bg-gray-700 dark:text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Admin Login
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
