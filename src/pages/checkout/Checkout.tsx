import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app-store/storeHooks";
import { Navigate, useNavigate } from "react-router-dom";

import AddressSelector from "../../components/checkout/AddressSelector";
import OrderSummary from "../../components/checkout/OrderSummary";
import PaymentMethod from "../../components/checkout/PaymentMethod";

import { clearCart } from "../../app-store/slice/cartSlice";

import createOrder from "../../utils/createOrder";
import { addOrder } from "../../utils/localStorage";
import { showSuccess } from "../../utils/toast";

import SEO from "../../components/seo/SEO";

import type { Address } from "../../types/address";
import type { PaymentMethod as PaymentMethodType } from "../../types/order";

import "./checkout.scss";

function Checkout() {
  const user = useAppSelector(
    (state) => state.auth.user
  );

  const cartItems = useAppSelector(
    (state) => state.cart.items
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] =
    useState<Address | null>(
      user?.addresses?.[0] ?? null
    );

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>("upi");

  const [error, setError] = useState("");

  if (!user) {
    return null;
  }

  // Nothing to check out: send the user back to their (empty) cart.
  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      setError("Please select a delivery address.");
      return;
    }

    const order = createOrder({
      user,
      cartItems,
      address: selectedAddress,
      paymentMethod,
    });

    if (
      !window.confirm(
        "Are you sure you want to place this order?"
      )
    ) {
      return;
    }

    addOrder(user.id, order);

    // Navigate before clearing the cart so the empty-cart redirect above
    // never wins the race.
    navigate("/order-confirmation", {
      replace: true,
      state: {
        orderId: order.id,
      },
    });

    dispatch(clearCart());

    showSuccess("Order placed successfully.");
  };

  return (
    <section className="checkout-section">
      <SEO
        title="Checkout"
        description="Complete your purchase securely by reviewing your order and selecting your payment method."
      />

      <div className="checkout-header">
        <h1>Checkout</h1>

        <p>
          Select address and payment method. Review your
          order and complete your purchase.
        </p>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="checkout-container">

        <div className="checkout-main">

          <AddressSelector
            selectedAddress={selectedAddress}
            onSelect={(address) => {
              setSelectedAddress(address);
              setError("");
            }}
          />

          <PaymentMethod
            paymentMethod={paymentMethod}
            onSelect={setPaymentMethod}
          />

        </div>

        <OrderSummary
          onPlaceOrder={handlePlaceOrder}
          cartItems={cartItems}
        />

      </div>
    </section>
  );
}

export default Checkout;