import { Link } from "react-router-dom";

import formatPaymentMethod from "../../utils/formatPaymentMethod";
import type { Order } from "../../types/order";

import "./orderCard.scss";

interface OrderCardProps {
  order: Order;
}

function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="order-card">
      <div className="order-details">

        <div className="order-row">
          <span>Order ID: </span>
          <strong>{order.id}</strong>
        </div>

        <div className="order-row">
          <span>Order Date: </span>
          <strong>
            {new Date(
              order.orderedAt
            ).toLocaleString()}
          </strong>
        </div>

        <div className="order-row">
          <span>Status: </span>
          <strong>{order.status}</strong>
        </div>

        <div className="order-row">
          <span>Payment Method: </span>
          <strong>
            {formatPaymentMethod(
              order.paymentMethod
            )}
          </strong>
        </div>

        <div className="order-row">
          <span>Total: </span>
          <strong>
            ${order.total.toFixed(2)}
          </strong>
        </div>

      </div>

      <div className="order-card-actions">
        <Link
          to={`/orders/${order.id}`}
          className="order-details-btn"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default OrderCard;