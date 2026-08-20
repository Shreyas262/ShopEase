import calculateOrderTotals from "../../utils/calculateOrderTotals";
import type { CartItem } from "../../types/cart";
import "./orderSummary.scss";

interface OrderSummaryProps {
  onPlaceOrder: () => void;
  cartItems: CartItem[];
}

function OrderSummary({
  onPlaceOrder,
  cartItems,
}: OrderSummaryProps) {
  if (cartItems.length === 0) {
    return (
      <section className="order-summary checkout-card">
        <h2>Order Summary</h2>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  const {
    totalItems,
    subtotal,
    shipping,
    tax,
    total,
  } = calculateOrderTotals(cartItems);

  return (
    <div className="order-summary checkout-card">
      <h2>Order Summary</h2>

      <div className="summary-list">
        {cartItems.map((item) => (
          <div
            className="summary-item"
            key={item.id}
          >
            <span>{item.title}</span>
            <span>x {item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="summary-calculations">
        <h3 className="summary-row">
          <span>Total Items: </span>
          <strong>{totalItems}</strong>
        </h3>

        <h3 className="summary-row">
          <span>Subtotal: </span>
          <strong>
            ${subtotal.toFixed(2)}
          </strong>
        </h3>

        <h3 className="summary-row">
          <span>Shipping: </span>

          <strong>
            {shipping === 0
              ? "FREE"
              : `$${shipping.toFixed(2)}`}
          </strong>
        </h3>

        <h3 className="summary-row">
          <span>Tax: </span>
          <strong>
            ${tax.toFixed(2)}
          </strong>
        </h3>

        <div className="summary-divider" />

        <h3 className="summary-total">
          <span>Total: </span>
          <strong>
            ${total.toFixed(2)}
          </strong>
        </h3>
      </div>

      <button
        type="button"
        className="place-order-btn"
        onClick={onPlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
}

export default OrderSummary;