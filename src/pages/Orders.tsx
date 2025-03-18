
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import OrderQRCode from '@/components/OrderQRCode';
import { Clock, Package, Truck, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock order data
const orderData = [
  {
    id: 'ORD78901',
    date: '2023-11-20',
    items: ['Vegan Bowl', 'Fruit Juice'],
    total: 349,
    status: 'delivered',
    location: 'Mumbai Kiosk',
    completedAt: '2023-11-20 14:30'
  },
  {
    id: 'ORD78902',
    date: '2023-11-20',
    items: ['Breakfast Wrap', 'Coffee'],
    total: 249,
    status: 'delivered',
    location: 'Delhi Airport Kiosk',
    completedAt: '2023-11-20 10:15'
  },
  {
    id: 'ORD78903',
    date: '2023-11-21',
    items: ['Protein Bowl', 'Smoothie'],
    total: 399,
    status: 'in-process',
    location: 'Bangalore Bus Station',
    estimatedTime: '15 minutes'
  },
  {
    id: 'ORD78904',
    date: '2023-11-21',
    items: ['Salad Box', 'Sparkling Water'],
    total: 299,
    status: 'in-process',
    location: 'Hyderabad Railway Station',
    estimatedTime: '20 minutes'
  }
];

const statusMap = {
  'placed': { label: 'Order Placed', progress: 25, icon: Clock },
  'preparing': { label: 'Preparing', progress: 50, icon: Package },
  'in-process': { label: 'Ready for Pickup', progress: 75, icon: Truck },
  'delivered': { label: 'Completed', progress: 100, icon: CheckCircle2 }
};

const Orders = () => {
  const navigate = useNavigate();
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleShowQRCode = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowQRCode(true);
  };

  const handleLocationClick = (location: string) => {
    setSelectedLocation(location === selectedLocation ? null : location);
  };

  const locations = [...new Set(orderData.map(order => order.location))];

  return (
    <div className="min-h-screen bg-neutral dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-playfair text-3xl font-bold mb-6 dark:text-white">
            My Orders
          </h1>

          <div className="mb-6">
            <h2 className="font-montserrat text-lg font-medium mb-3 dark:text-white">
              QuickBite Locations
            </h2>
            <div className="flex flex-wrap gap-2">
              {locations.map((location) => (
                <Button
                  key={location}
                  variant={selectedLocation === location ? "active" : "outline"}
                  size="sm"
                  onClick={() => handleLocationClick(location)}
                >
                  {location}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-montserrat text-lg font-medium dark:text-white">
              Current Orders
            </h2>
            {orderData
              .filter(order => order.status === 'in-process')
              .filter(order => !selectedLocation || order.location === selectedLocation)
              .map((order) => (
                <Card key={order.id} className="overflow-hidden border shadow-md">
                  <CardHeader className="bg-primary/5 pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{order.location}</CardTitle>
                      <span className="text-sm text-gray-500">{order.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          <statusMap[order.status].icon className="h-5 w-5 text-amber-500" />
                          Ready for Pickup
                        </h3>
                        <p className="text-sm text-gray-500">Est. time: {order.estimatedTime}</p>
                      </div>
                      
                      <div className="mt-2">
                        <Progress value={statusMap[order.status].progress} className="h-2" />
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-sm font-medium">Order #{order.id}</p>
                        <p className="text-sm">{order.items.join(", ")}</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="font-semibold">₹{order.total}</span>
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleShowQRCode(order.id)}
                          >
                            Show QR Code
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            
            <h2 className="font-montserrat text-lg font-medium mt-8 dark:text-white">
              Past Orders
            </h2>
            {orderData
              .filter(order => order.status === 'delivered')
              .filter(order => !selectedLocation || order.location === selectedLocation)
              .map((order) => (
                <Card key={order.id} className="overflow-hidden border shadow-md">
                  <CardHeader className="bg-primary/5 pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{order.location}</CardTitle>
                      <span className="text-sm text-gray-500">{order.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          Completed
                        </h3>
                        <p className="text-sm text-gray-500">Completed at: {order.completedAt}</p>
                      </div>
                      
                      <div className="mt-2">
                        <Progress value={100} className="h-2" />
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-sm font-medium">Order #{order.id}</p>
                        <p className="text-sm">{order.items.join(", ")}</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="font-semibold">₹{order.total}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/order`)}
                          >
                            Order Again
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>

      <OrderQRCode 
        open={showQRCode} 
        onClose={() => setShowQRCode(false)} 
        orderId={selectedOrderId} 
      />
    </div>
  );
};

export default Orders;
