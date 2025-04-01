
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import OrderQRCode from "@/components/OrderQRCode";
import { Separator } from "@/components/ui/separator";
import { Order, OrderStatus } from "@/types/order";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch orders on component mount
  useEffect(() => {
    // In a real app, fetch orders from API/database
    // For demo, we'll create mock orders
    const mockOrders: Order[] = [
      {
        id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        customerName: "User",
        customerEmail: localStorage.getItem("userEmail") || "user@example.com",
        items: [
          { id: "1", name: "Vegetable Biryani", price: 9.99, quantity: 1, image: "/food/biryani.jpg" },
          { id: "2", name: "Samosa", price: 3.99, quantity: 2, image: "/food/samosa.jpg" }
        ],
        totalAmount: 17.97,
        status: "delivered",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        pickupTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
        kioskLocation: "Main Station, Platform 3"
      },
      {
        id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
        customerName: "User",
        customerEmail: localStorage.getItem("userEmail") || "user@example.com",
        items: [
          { id: "3", name: "Butter Chicken", price: 12.99, quantity: 1, image: "/food/butter-chicken.jpg" },
          { id: "4", name: "Naan", price: 2.49, quantity: 2, image: "/food/naan.jpg" }
        ],
        totalAmount: 17.97,
        status: "in-process",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        pickupTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        kioskLocation: "Shopping Mall, Food Court"
      }
    ];

    setOrders(mockOrders);

    // In a real app, set up a subscription to listen for order status updates
    // This could be a WebSocket connection or polling

    // Simulate an order status update after 10 seconds
    const timer = setTimeout(() => {
      const updatedOrders = [...mockOrders];
      // Update the status of the in-process order to "ready"
      const inProcessOrderIndex = updatedOrders.findIndex(o => o.status === "in-process");
      if (inProcessOrderIndex !== -1) {
        updatedOrders[inProcessOrderIndex] = {
          ...updatedOrders[inProcessOrderIndex],
          status: "ready" as OrderStatus
        };
        setOrders(updatedOrders);
        
        toast({
          title: "Order Ready!",
          description: `Your order ${updatedOrders[inProcessOrderIndex].id} is now ready for pickup.`,
        });
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleViewQRCode = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  const handleBack = () => {
    setSelectedOrderId(null);
  };

  const getOrdersByStatus = (status: "delivered" | "in-process" | "ready") => {
    return orders.filter(order => {
      if (status === "in-process") {
        return order.status === "pending" || order.status === "preparing" || order.status === "in-process";
      }
      return order.status === status;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">Pending</Badge>;
      case "preparing":
        return <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">Preparing</Badge>;
      case "ready":
        return <Badge variant="outline" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Ready for pickup</Badge>;
      case "completed":
      case "delivered":
        return <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">Delivered</Badge>;
      case "in-process":
        return <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">In Process</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // If viewing a specific order's QR code
  if (selectedOrderId) {
    const order = orders.find(o => o.id === selectedOrderId);
    if (!order) return null;

    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          ← Back to Orders
        </Button>
        
        <OrderQRCode 
          orderId={order.id} 
          orderDetails={{
            items: order.items.map(item => `${item.quantity}x ${item.name}`),
            total: order.totalAmount,
            pickupTime: formatDate(order.pickupTime),
            kioskLocation: order.kioskLocation
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      
      <Tabs defaultValue="active">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="past">Past Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="space-y-6">
            {/* Ready for pickup orders */}
            {getOrdersByStatus("ready").length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3 flex items-center">
                  <Badge variant="outline" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 mr-2">
                    Ready
                  </Badge>
                  Ready for Pickup
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {getOrdersByStatus("ready").map(order => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{order.id}</CardTitle>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Ordered on: {formatDate(order.createdAt)}
                        </p>
                        <p className="text-sm font-medium">
                          Pickup at: {formatDate(order.pickupTime)}
                        </p>
                        <p className="text-sm font-medium">
                          Location: {order.kioskLocation}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {order.items.map(item => (
                            <div key={item.id} className="flex justify-between">
                              <div>
                                <span className="font-medium">{item.quantity}x</span> {item.name}
                              </div>
                              <div>${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                          ))}
                          <Separator />
                          <div className="flex justify-between font-bold">
                            <div>Total</div>
                            <div>${order.totalAmount.toFixed(2)}</div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => handleViewQRCode(order.id)}>
                          View QR Code
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* In-process orders */}
            {getOrdersByStatus("in-process").length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-3 flex items-center">
                  <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 mr-2">
                    In Process
                  </Badge>
                  In Process
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {getOrdersByStatus("in-process").map(order => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{order.id}</CardTitle>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Ordered on: {formatDate(order.createdAt)}
                        </p>
                        <p className="text-sm font-medium">
                          Pickup at: {formatDate(order.pickupTime)}
                        </p>
                        <p className="text-sm font-medium">
                          Location: {order.kioskLocation}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {order.items.map(item => (
                            <div key={item.id} className="flex justify-between">
                              <div>
                                <span className="font-medium">{item.quantity}x</span> {item.name}
                              </div>
                              <div>${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                          ))}
                          <Separator />
                          <div className="flex justify-between font-bold">
                            <div>Total</div>
                            <div>${order.totalAmount.toFixed(2)}</div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => handleViewQRCode(order.id)}>
                          View QR Code
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {getOrdersByStatus("ready").length === 0 && getOrdersByStatus("in-process").length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">You don't have any active orders.</p>
                <Button className="mt-4" onClick={() => navigate("/order")}>
                  Order Now
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="space-y-6">
            {getOrdersByStatus("delivered").length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {getOrdersByStatus("delivered").map(order => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{order.id}</CardTitle>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ordered on: {formatDate(order.createdAt)}
                      </p>
                      <p className="text-sm font-medium">
                        Pickup at: {formatDate(order.pickupTime)}
                      </p>
                      <p className="text-sm font-medium">
                        Location: {order.kioskLocation}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between">
                            <div>
                              <span className="font-medium">{item.quantity}x</span> {item.name}
                            </div>
                            <div>${(item.price * item.quantity).toFixed(2)}</div>
                          </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between font-bold">
                          <div>Total</div>
                          <div>${order.totalAmount.toFixed(2)}</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => navigate("/order")}>
                        Order Again
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">You don't have any past orders.</p>
                <Button className="mt-4" onClick={() => navigate("/order")}>
                  Order Now
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
