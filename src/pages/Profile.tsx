
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Heart, Settings } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = React.useState<string>('');
  const [dietaryPreferences, setDietaryPreferences] = React.useState<string[]>([]);
  const [cuisinePreference, setCuisinePreference] = React.useState<string>('');

  React.useEffect(() => {
    // Check if user is logged in
    const email = localStorage.getItem('userEmail');
    const preferences = localStorage.getItem('dietaryPreferences');
    const cuisine = localStorage.getItem('cuisinePreference');
    
    if (!email) {
      navigate('/signin');
      return;
    }
    
    setUserEmail(email);
    setDietaryPreferences(preferences ? JSON.parse(preferences) : []);
    setCuisinePreference(cuisine || 'All');
  }, [navigate]);

  // Sample past orders
  const pastOrders = [
    {
      id: 'ORD123456',
      date: '2023-11-15',
      items: ['Veg Burger', 'French Fries', 'Cola'],
      total: 299,
      status: 'Delivered',
      location: 'Central Mall Kiosk'
    },
    {
      id: 'ORD123457',
      date: '2023-11-10',
      items: ['Paneer Wrap', 'Onion Rings'],
      total: 249,
      status: 'Delivered',
      location: 'Airport Terminal 2'
    },
  ];

  return (
    <div className="min-h-screen bg-neutral dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <CardTitle>{userEmail}</CardTitle>
                  <CardDescription>Member since November 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/orders')}>
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Orders
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Heart className="mr-2 h-4 w-4" />
                      Favorites
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="w-full md:w-2/3">
              <Tabs defaultValue="orders">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>
                
                <TabsContent value="orders" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>Your past orders with QuickBite</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pastOrders.map(order => (
                          <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">{order.id}</span>
                              <span className="text-sm text-gray-500">{order.date}</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{order.items.join(", ")}</p>
                            <div className="flex justify-between mt-2">
                              <span className="text-primary font-medium">₹{order.total}</span>
                              <span className="text-sm text-green-600">{order.status}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Location: {order.location}</p>
                          </div>
                        ))}
                        
                        {pastOrders.length === 0 && (
                          <div className="text-center py-8">
                            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No orders yet</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Start ordering delicious food to see your history here.
                            </p>
                            <div className="mt-6">
                              <Button onClick={() => navigate('/order')}>
                                Place your first order
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="preferences" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Food Preferences</CardTitle>
                      <CardDescription>Your dietary and cuisine preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">Dietary Preferences</h3>
                          {dietaryPreferences.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {dietaryPreferences.map(pref => (
                                <span key={pref} className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground px-3 py-1 rounded-full text-sm">
                                  {pref}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 dark:text-gray-400">No dietary preferences set</p>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">Preferred Cuisine</h3>
                          <span className="bg-secondary/10 text-secondary-foreground dark:bg-secondary/20 dark:text-secondary-foreground px-3 py-1 rounded-full text-sm">
                            {cuisinePreference}
                          </span>
                        </div>
                        
                        <Button variant="outline" onClick={() => navigate('/signin')}>
                          Update Preferences
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="account" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>Manage your account details</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                          <p className="text-lg font-medium">{userEmail}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Type</h3>
                          <p className="text-lg font-medium">Regular Member</p>
                        </div>
                        
                        <div className="pt-4">
                          <Button variant="destructive" onClick={() => {
                            localStorage.clear();
                            navigate('/signin');
                          }}>
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
