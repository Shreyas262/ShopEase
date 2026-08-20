import { useAppSelector } from "../../app-store/storeHooks";
import { useParams, Link } from "react-router-dom";

import { loadOrders } from "../../utils/localStorage";
import formatPaymentMethod from "../../utils/formatPaymentMethod";

import SEO from "../../components/seo/SEO";

import "./orderDetails.scss";

function OrderDetails() {
  const { orderId } = useParams<{
    orderId: string;
  }>();

  const user = useAppSelector(
    (state) => state.auth.user
  );

  if (!user) {
    return null;
  }

  const userOrders = loadOrders()[user.id] ?? [];

  if (userOrders.length === 0) {
    return <p>No orders</p>;
  }

  const currentOrder = userOrders.find(
    (order) => order.id === orderId
  );

  if (!currentOrder) {
    return <p>Order not found.</p>;
  }

  return (
    <section className="order-details-section">
      <SEO
        title="Order Details"
        description="View detailed information about your order, shipping address, payment method, and purchased products."
      />

      <div className="order-details-container container">

        <div className="order-detais-header">
          <h1>Order Details</h1>

          <p>
            View complete information about your order.
          </p>
        </div>

        <div className="order-information card">
          <h2>Order Information</h2>

          <p>
            <strong>Order ID: </strong>
            {currentOrder.id}
          </p>

          <p>
            <strong>Placed On: </strong>
            {new Date(
              currentOrder.orderedAt
            ).toLocaleString()}
          </p>

          <p>
            <strong>Payment Method: </strong>
            {formatPaymentMethod(
              currentOrder.paymentMethod
            )}
          </p>

          <p>
            <strong>Status: </strong>
            {currentOrder.status}
          </p>
        </div>

        <div className="shipping-information card">
          <h2>Shipping Information</h2>

          <p>
            {currentOrder.address.flatHouse},{" "}
            {currentOrder.address.buildingStreet},{" "}
            {currentOrder.address.city} -{" "}
            {currentOrder.address.zipcode}
          </p>
        </div>

        <div className="ordered-products card">
          <h2>Ordered Products</h2>

          {currentOrder.items.map((product) => (
            <div
              className="product-row"
              key={product.id}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
              />

              <div className="product-details">
                <h3>{product.title}</h3>

                <p>
                  Price: ${product.price.toFixed(2)}
                </p>

                <p>
                  Quantity: {product.quantity}
                </p>

                <p>
                  Subtotal: $
                  {(
                    product.quantity *
                    product.price
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pricing-summary card">
          <h2>Pricing Summary</h2>

          <div className="summary-row">
            <span>Subtotal: </span>
            <strong>
              ${currentOrder.subtotal.toFixed(2)}
            </strong>
          </div>

          <div className="summary-row">
            <span>Shipping: </span>
            <strong>
              ${currentOrder.shipping.toFixed(2)}
            </strong>
          </div>

          <div className="summary-row">
            <span>Tax: </span>
            <strong>
              ${currentOrder.tax.toFixed(2)}
            </strong>
          </div>

          <div className="summary-row">
            <span>Total Amount: </span>
            <strong>
              ${currentOrder.total.toFixed(2)}
            </strong>
          </div>
        </div>

        <Link
          to="/orders"
          className="back-to-orders-btn button"
        >
          Back to orders
        </Link>

      </div>
    </section>
  );
}

export default OrderDetails;