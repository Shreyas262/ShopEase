import type { PaymentMethod as PaymentMethodType } from "../../types/order";
import "./paymentMethod.scss";

const paymentOptions: {
  id: PaymentMethodType;
  title: string;
  description: string;
}[] = [
  {
    id: "upi",
    title: "UPI",
    description:
      "Pay by any UPI app - Google Pay, PhonePe, Paytm, BHIM.",
  },
  {
    id: "card",
    title: "Credit / Debit Card",
    description:
      "Pay by card - Visa, Mastercard, RuPay and more.",
  },
  {
    id: "cod",
    title: "Cash on Delivery",
    description:
      "Pay when your order is delivered.",
  },
];

interface PaymentMethodProps {
  paymentMethod: PaymentMethodType;
  onSelect: (method: PaymentMethodType) => void;
}

function PaymentMethod({
  paymentMethod,
  onSelect,
}: PaymentMethodProps) {
  return (
    <div className="payment-method-container checkout-card">
      <h2>Select Payment Method</h2>

      <div className="payment-list">
        {paymentOptions.map((option) => (
          <div
            className="payment-card"
            key={option.id}
          >
            <label
              htmlFor={option.id}
              className="payment-method-label"
            >
              <input
                type="radio"
                name="paymentOption"
                id={option.id}
                value={option.id}
                checked={
                  paymentMethod === option.id
                }
                onChange={() =>
                  onSelect(option.id)
                }
                required
              />

              <div className="payment-method-details">
                <h3>{option.title}</h3>
                <p>{option.description}</p>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentMethod;