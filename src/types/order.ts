import type { Address } from "./address";
import type { CartItem } from "./cart";

export type PaymentMethod = "card" | "upi" | "cod";

export type OrderStatus =
  | "Placed"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  address: Address;
  paymentMethod: PaymentMethod;
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  orderedAt: string;
}