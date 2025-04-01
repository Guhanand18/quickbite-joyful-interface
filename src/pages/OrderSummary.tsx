
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { ArrowLeft, ArrowRight, Package, Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, locationName } = location.state || { cart: [], locationName: "Mumbai Kiosk" };

  const getFormattedTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // Estimated delivery time
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalItemPrice, 0);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  if (!cart || cart.length === 0) {
    navigate('/order');
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => navigate('/order')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Menu
        </Button>

        <h1 className="font-playfair text-3xl font-bold mb-8 dark:text-white">Order Summary</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Package className="mr-2 h-5 w-5 text-primary" />
                  Order Items
                </h2>
                
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-start justify-between pb-4">
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold dark:text-white">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                          
                          {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {item.selectedOptions.size && (
                                <div>Size: {item.selectedOptions.size}</div>
                              )}
                              {item.selectedOptions.spiceLevel && (
                                <div>Spice: {item.selectedOptions.spiceLevel}</div>
                              )}
                              {item.selectedOptions.addOns && item.selectedOptions.addOns.length > 0 && (
                                <div>Add-ons: {item.selectedOptions.addOns.join(', ')}</div>
                              )}
                              {item.selectedOptions.extras && item.selectedOptions.extras.length > 0 && (
                                <div>Extras: {item.selectedOptions.extras.join(', ')}</div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="font-semibold dark:text-white">₹{item.totalItemPrice}</div>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="dark:text-white">₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Taxes</span>
                    <span className="dark:text-white">₹{Math.round(getTotalPrice() * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Packaging Fee</span>
                    <span className="dark:text-white">₹20</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span className="dark:text-white">Total</span>
                    <span className="dark:text-white">₹{getTotalPrice() + Math.round(getTotalPrice() * 0.05) + 20}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Pickup Details
                </h2>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Kiosk Location</div>
                    <div className="font-medium dark:text-white">{locationName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Estimated Pickup Time</div>
                    <div className="font-medium flex items-center dark:text-white">
                      <Clock className="mr-1 h-4 w-4 text-primary" />
                      {getFormattedTime()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full flex justify-between items-center h-12 text-lg"
              onClick={handleProceedToCheckout}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
