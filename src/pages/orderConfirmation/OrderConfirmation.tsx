import { Link, useLocation } from "react-router-dom";

import { useAppSelector } from "../../app-store/storeHooks";

import { loadOrders } from "../../utils/localStorage";
import formatPaymentMethod from "../../utils/formatPaymentMethod";

import SEO from "../../components/seo/SEO";

import "./orderConfirmation.scss";

interface OrderConfirmationLocationState {
  orderId: string;
}

function OrderConfirmation() {
  const user = useAppSelector(
    (state) => state.auth.user
  );

  const location = useLocation();

  if (!user) {
    return null;
  }

  const userOrders = loadOrders()[user.id] ?? [];

  const state =
    location.state as OrderConfirmationLocationState | null;

  const orderId = state?.orderId;

  const placedOrder = userOrders.find(
    (order) => order.id === orderId
  );

  if (!placedOrder) {
    return (
      <section className="order-confirmation-section">
        <div className="order-confirmation-container">
          <h1>Order not found.</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="order-confirmation-section">
      <SEO
        title="Order Confirmation"
        description="Your order has been placed successfully. View your confirmation and order details."
      />

      <div className="order-confirmation-container">

        <div className="confirmation-header">
          <div className="confirmation-icon">
            ✅
          </div>

          <h1>
            Order placed successfully!
          </h1>
        </div>

        <div className="confirmation-body">
          <p>
            Thank you for your purchase.
            We've received your order and will begin
            processing it shortly.
          </p>

          <div className="confirmation-details">

            <div className="confirmation-row">
              <span>Order ID</span>
              <strong>{placedOrder.id}</strong>
            </div>

            <div className="confirmation-row">
              <span>Placed On</span>
              <strong>
                {new Date(
                  placedOrder.orderedAt
                ).toLocaleString()}
              </strong>
            </div>

            <div className="confirmation-row">
              <span>Payment</span>
              <strong>
                {formatPaymentMethod(
                  placedOrder.paymentMethod
                )}
              </strong>
            </div>

            <div className="confirmation-row">
              <span>Status</span>
              <strong>
                {placedOrder.status}
              </strong>
            </div>

            <div className="confirmation-row">
              <span>Total</span>
              <strong>
                ${placedOrder.total.toFixed(2)}
              </strong>
            </div>

          </div>
        </div>

        <div className="confirmation-actions">

          <Link
            to="/products"
            className="button"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="button"
          >
            View Orders
          </Link>

        </div>

      </div>
    </section>
  );
}

export default OrderConfirmation;