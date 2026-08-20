import type { PaymentMethod } from "../types/order";

const paymentMethods: Record<PaymentMethod, string> = {
  card: "Credit / Debit Card",
  upi: "UPI",
  cod: "Cash on Delivery",
};

export default function formatPaymentMethod(method: PaymentMethod): string {
  return paymentMethods[method];
}