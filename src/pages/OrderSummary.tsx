
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { ArrowLeft, ArrowRight, Package, Clock, MapPin, Plus, Minus, Trash2, Check, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const { locationName, locationAddress, locationId } = location.state || { 
    locationName: "Mumbai Kiosk",
    locationAddress: "Shop 4, Chhatrapati Shivaji Terminus, Mumbai - 400050",
    locationId: 1
  };
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [pickupTime, setPickupTime] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // Default to 30 minutes from now
    return format(now, 'h:mm a');
  });

  const getFormattedTime = () => {
    return pickupTime;
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.totalItemPrice, 0);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout', { 
      state: { 
        cart, 
        locationName, 
        locationAddress, 
        locationId,
        pickupTime: getFormattedTime(),
        pickupDate: date ? format(date, 'dd MMM yyyy') : '',
        subTotal: getTotalPrice(),
        discount,
        tax: Math.round(getTotalPrice() * 0.05),
        packagingFee: 10,
        total: getTotalPrice() + Math.round(getTotalPrice() * 0.05) + 10 - discount
      } 
    });
  };

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'new10') {
      const discountAmount = Math.round(getTotalPrice() * 0.1);
      setDiscount(discountAmount);
      setCouponApplied(true);
      toast.success('Coupon applied successfully!');
    } else if (couponCode.toLowerCase() === 'quick20') {
      const discountAmount = Math.round(getTotalPrice() * 0.2);
      setDiscount(discountAmount);
      setCouponApplied(true);
      toast.success('Coupon applied successfully!');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];
    item.quantity += 1;
    item.totalItemPrice = item.price * item.quantity;
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cart];
    const item = updatedCart[index];
    if (item.quantity > 1) {
      item.quantity -= 1;
      item.totalItemPrice = item.price * item.quantity;
      setCart(updatedCart);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCart = [...cart].filter((_, i) => i !== index);
    setCart(updatedCart);
    toast.success('Item removed from order');
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
                          <p className="text-sm text-gray-500 dark:text-gray-400">₹{item.price}</p>
                          
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
                          
                          <div className="flex items-center mt-2 space-x-1">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-7 w-7"
                              onClick={() => handleDecreaseQuantity(index)}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </Button>
                            <span className="mx-2 w-6 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-7 w-7"
                              onClick={() => handleIncreaseQuantity(index)}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 text-red-500 ml-2"
                              onClick={() => handleRemoveItem(index)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="font-semibold dark:text-white">₹{item.totalItemPrice}</div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex items-end gap-2 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                      className="mb-2"
                    />
                    {couponApplied && (
                      <div className="text-sm text-green-600 flex items-center">
                        <Check className="h-4 w-4 mr-1" /> Coupon applied
                      </div>
                    )}
                  </div>
                  <Button 
                    onClick={handleApplyCoupon}
                    disabled={couponApplied || !couponCode}
                    variant={couponApplied ? "active" : "default"}
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </Button>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="dark:text-white">₹{getTotalPrice()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Discount</span>
                      <span className="text-green-600">-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Taxes</span>
                    <span className="dark:text-white">₹{Math.round(getTotalPrice() * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Packaging Fee</span>
                    <span className="dark:text-white">₹10</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span className="dark:text-white">Total</span>
                    <span className="dark:text-white">₹{getTotalPrice() + Math.round(getTotalPrice() * 0.05) + 10 - discount}</span>
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
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{locationAddress}</div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Pickup Date</div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {date ? format(date, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Pickup Time</div>
                    <select 
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                    >
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="9:30 AM">9:30 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="12:30 PM">12:30 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="1:30 PM">1:30 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="2:30 PM">2:30 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="3:30 PM">3:30 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="4:30 PM">4:30 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                      <option value="5:30 PM">5:30 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="6:30 PM">6:30 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="7:30 PM">7:30 PM</option>
                      <option value="8:00 PM">8:00 PM</option>
                    </select>
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
