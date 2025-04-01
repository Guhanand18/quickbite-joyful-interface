
export type OrderStatus = "pending" | "preparing" | "ready" | "completed" | "cancelled" | "delivered" | "in-process";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customization?: string;
  image?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  pickupTime: string;
  kioskLocation: string;
  couponCode?: string;
  couponDiscount?: number;
}
