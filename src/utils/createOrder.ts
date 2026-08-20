import type { Address } from "../types/address";
import type { CartItem } from "../types/cart";
import type {
  Order,
  PaymentMethod,
} from "../types/order";
import type { User } from "../types/user";

import calculateOrderTotals from "./calculateOrderTotals";

interface CreateOrderParams {
  user: User;
  cartItems: CartItem[];
  address: Address;
  paymentMethod: PaymentMethod;
}

export default function createOrder({
  user,
  cartItems,
  address,
  paymentMethod,
}: CreateOrderParams): Order {
  const {
    totalItems,
    subtotal,
    shipping,
    tax,
    total,
  } = calculateOrderTotals(cartItems);

  return {
    id: crypto.randomUUID(),
    userId: user.id,
    items: cartItems,
    address,
    paymentMethod,
    totalItems,
    subtotal,
    shipping,
    tax,
    total,
    status: "Placed",
    orderedAt: new Date().toISOString(),
  };
}