
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, ArrowLeft, ChevronRight } from 'lucide-react';
import OrderQRCode from '@/components/OrderQRCode';

const orders = [
  {
    id: "ORD-123456",
    date: new Date('2023-06-10T15:30:00'),
    items: [
      { name: "Avocado Toast", quantity: 1, price: 399 },
      { name: "Fruit & Yogurt Parfait", quantity: 1, price: 249 }
    ],
    status: "delivered",
    total: 648,
    kiosk: "Mumbai Central"
  },
  {
    id: "ORD-654321",
    date: new Date('2023-06-15T12:45:00'),
    items: [
      { name: "Paneer Tikka Wrap", quantity: 2, price: 698 },
      { name: "Masala Dosa", quantity: 1, price: 199 }
    ],
    status: "delivered",
    total: 897,
    kiosk: "Bandra"
  },
  {
    id: "ORD-789456",
    date: new Date('2023-06-20T18:15:00'),
    items: [
      { name: "Quinoa Bowl", quantity: 1, price: 499 },
      { name: "Smoothie Bowl", quantity: 1, price: 299 }
    ],
    status: "in-process",
    total: 798,
    kiosk: "Andheri"
  },
  {
    id: "ORD-456789",
    date: new Date('2023-06-22T09:30:00'),
    items: [
      { name: "Vada Pav", quantity: 2, price: 178 },
      { name: "Filter Coffee", quantity: 1, price: 99 }
    ],
    status: "in-process",
    total: 277,
    kiosk: "Dadar"
  }
];

const Orders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const handleOrderClick = (orderId: string, status: string) => {
    if (status === "in-process") {
      setSelectedOrderId(orderId);
      setShowQRCode(true);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter(order => activeTab === "delivered" 
        ? order.status === "delivered" 
        : order.status === "in-process");

  return (
    <div className="min-h-screen bg-neutral dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <h1 className="font-playfair text-3xl font-bold mb-8 dark:text-white">My Orders</h1>

        <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="in-process">In Process</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 mt-6">
            {filteredOrders.map(order => (
              <OrderCard 
                key={order.id}
                order={order}
                onClick={() => handleOrderClick(order.id, order.status)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="delivered" className="space-y-4 mt-6">
            {filteredOrders.map(order => (
              <OrderCard 
                key={order.id}
                order={order}
                onClick={() => handleOrderClick(order.id, order.status)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="in-process" className="space-y-4 mt-6">
            {filteredOrders.map(order => (
              <OrderCard 
                key={order.id}
                order={order}
                onClick={() => handleOrderClick(order.id, order.status)}
              />
            ))}
          </TabsContent>
        </Tabs>

        <OrderQRCode 
          open={showQRCode} 
          onClose={() => setShowQRCode(false)} 
          orderId={selectedOrderId} 
        />
      </div>
    </div>
  );
};

interface OrderCardProps {
  order: {
    id: string;
    date: Date;
    items: { name: string; quantity: number; price: number }[];
    status: string;
    total: number;
    kiosk: string;
  };
  onClick: () => void;
}

const OrderCard = ({ order, onClick }: OrderCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className={`hover:shadow-md transition-shadow cursor-pointer ${
        order.status === "in-process" ? "border-primary" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg dark:text-white">{order.id}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {order.date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className="flex items-center">
            {order.status === "delivered" ? (
              <span className="flex items-center text-green-600 text-sm font-medium">
                <CheckCircle className="h-4 w-4 mr-1" />
                Delivered
              </span>
            ) : (
              <span className="flex items-center text-orange-500 text-sm font-medium">
                <Clock className="h-4 w-4 mr-1" />
                In Process
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-sm text-gray-600 dark:text-gray-300 mb-2">Order Items:</h4>
          <ul className="space-y-1">
            {order.items.map((item, idx) => (
              <li key={idx} className="text-sm dark:text-white">
                {item.name} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
            <div className="font-semibold dark:text-white">₹{order.total}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Kiosk</div>
            <div className="text-sm dark:text-white">{order.kiosk}</div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Orders;
