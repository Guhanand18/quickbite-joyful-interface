
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Clock, CheckCircle2, AlertCircle, Package } from "lucide-react";

type OrderStatus = "pending" | "preparing" | "ready" | "completed" | "cancelled";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customization?: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  pickupTime: string;
  kioskLocation: string;
}

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in as admin
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/signin");
      return;
    }

    // In a real app, fetch orders from backend
    // For demo, generate mock orders
    const mockOrders: Order[] = [
      {
        id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        customerName: "John Doe",
        customerEmail: "john@example.com",
        items: [
          { id: "1", name: "Veggie Burger", price: 5.99, quantity: 2 },
          { id: "2", name: "French Fries", price: 2.49, quantity: 1, customization: "Extra salt" }
        ],
        totalAmount: 14.47,
        status: "pending",
        createdAt: new Date(Date.now() - 20 * 60000).toISOString(),
        pickupTime: new Date(Date.now() + 15 * 60000).toISOString(),
        kioskLocation: "Main Station, Platform 3"
      },
      {
        id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        customerName: "Alice Smith",
        customerEmail: "alice@example.com",
        items: [
          { id: "3", name: "Chicken Sandwich", price: 6.99, quantity: 1 },
          { id: "4", name: "Coke", price: 1.99, quantity: 2 }
        ],
        totalAmount: 10.97,
        status: "preparing",
        createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
        pickupTime: new Date(Date.now() + 10 * 60000).toISOString(),
        kioskLocation: "Shopping Mall, Food Court"
      },
      {
        id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        customerName: "Emma Johnson",
        customerEmail: "emma@example.com",
        items: [
          { id: "5", name: "Salad Bowl", price: 7.99, quantity: 1, customization: "No onions" },
          { id: "6", name: "Mineral Water", price: 1.49, quantity: 1 }
        ],
        totalAmount: 9.48,
        status: "ready",
        createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
        pickupTime: new Date(Date.now() + 5 * 60000).toISOString(),
        kioskLocation: "Airport Terminal, Gate B"
      },
      {
        id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        customerName: "Michael Brown",
        customerEmail: "michael@example.com",
        items: [
          { id: "7", name: "Pizza Slice", price: 4.99, quantity: 3 },
          { id: "8", name: "Ice Cream", price: 3.49, quantity: 1 }
        ],
        totalAmount: 18.46,
        status: "completed",
        createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
        pickupTime: new Date(Date.now() - 60 * 60000).toISOString(),
        kioskLocation: "Central Park, Kiosk 2"
      }
    ];

    setOrders(mockOrders);
  }, [navigate]);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

  const getFilteredOrders = () => {
    if (activeTab === "all") {
      return orders;
    }
    return orders.filter(order => order.status === activeTab);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    // Update order status in the state
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    
    // If currently viewing the order that was updated, update the selected order too
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
    
    // Show success toast
    toast({
      title: "Order status updated",
      description: `Order ${orderId} has been updated to ${newStatus}.`,
    });
    
    // In a real app, you would send this update to your backend
    // and potentially notify the customer via push notification, email, etc.
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">Pending</Badge>;
      case "preparing":
        return <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">Preparing</Badge>;
      case "ready":
        return <Badge variant="outline" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Ready</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // If viewing order details
  if (selectedOrder) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleBackToOrders} className="mb-4">
          ← Back to Orders
        </Button>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Order Details: {selectedOrder.id}</CardTitle>
                <CardDescription>Placed on {formatDate(selectedOrder.createdAt)}</CardDescription>
              </div>
              {getStatusBadge(selectedOrder.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
                <p><span className="font-medium">Name:</span> {selectedOrder.customerName}</p>
                <p><span className="font-medium">Email:</span> {selectedOrder.customerEmail}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            {item.customization && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {item.customization}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4 text-right">
                  <div className="font-medium">Total: ${selectedOrder.totalAmount.toFixed(2)}</div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Pickup Information</h3>
                <p><span className="font-medium">Pickup Time:</span> {formatDate(selectedOrder.pickupTime)}</p>
                <p><span className="font-medium">Kiosk Location:</span> {selectedOrder.kioskLocation}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="space-x-2">
              {selectedOrder.status === "pending" && (
                <Button onClick={() => updateOrderStatus(selectedOrder.id, "preparing")}>
                  Start Preparing
                </Button>
              )}
              {selectedOrder.status === "preparing" && (
                <Button onClick={() => updateOrderStatus(selectedOrder.id, "ready")}>
                  Mark as Ready
                </Button>
              )}
              {selectedOrder.status === "ready" && (
                <Button onClick={() => updateOrderStatus(selectedOrder.id, "completed")}>
                  Mark as Completed
                </Button>
              )}
              {(selectedOrder.status === "pending" || selectedOrder.status === "preparing") && (
                <Button variant="destructive" onClick={() => updateOrderStatus(selectedOrder.id, "cancelled")}>
                  Cancel Order
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={() => {
          localStorage.removeItem("isAdmin");
          localStorage.removeItem("hotelId");
          navigate("/signin");
        }}>
          Logout
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Pending Orders</p>
                <h3 className="text-2xl font-bold">{orders.filter(o => o.status === "pending").length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Preparing</p>
                <h3 className="text-2xl font-bold">{orders.filter(o => o.status === "preparing").length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle2 className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Ready for Pickup</p>
                <h3 className="text-2xl font-bold">{orders.filter(o => o.status === "ready").length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
              <div>
                <p className="text-sm font-medium">Cancelled</p>
                <h3 className="text-2xl font-bold">{orders.filter(o => o.status === "cancelled").length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <div className="flex space-x-2 mt-2">
            <Button 
              variant={activeTab === "all" ? "active" : "ghost"} 
              onClick={() => setActiveTab("all")}
            >
              All
            </Button>
            <Button 
              variant={activeTab === "pending" ? "active" : "ghost"} 
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </Button>
            <Button 
              variant={activeTab === "preparing" ? "active" : "ghost"} 
              onClick={() => setActiveTab("preparing")}
            >
              Preparing
            </Button>
            <Button 
              variant={activeTab === "ready" ? "active" : "ghost"} 
              onClick={() => setActiveTab("ready")}
            >
              Ready
            </Button>
            <Button 
              variant={activeTab === "completed" ? "active" : "ghost"} 
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Pickup Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getFilteredOrders().map((order) => (
                <TableRow key={order.id} className="cursor-pointer" onClick={() => handleOrderClick(order)}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>{formatDate(order.pickupTime)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderClick(order);
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {getFilteredOrders().length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
