import {
  useAppDispatch,
  useAppSelector,
} from "../../app-store/storeHooks";

import { useNavigate, Link } from "react-router-dom";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../../app-store/slice/cartSlice";

import { FiTrash2 } from "react-icons/fi";

import { showInfo } from "../../utils/toast";
import SEO from "../../components/seo/SEO";

import "./cart.scss";

// Renders the cart with actions:
// remove item, increase/decrease quantity,
// and cart summary.
function Cart() {
  const items = useAppSelector(
    (state) => state.cart.items
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalCartItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = items
    .reduce(
      (total, item) =>
        total + item.quantity * item.price,
      0
    )
    .toFixed(2);

  const handleItemClick = (itemId: number) => {
    navigate(`/products/${itemId}`);
  };

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <SEO
          title="Shopping Cart"
          description="Review your shopping cart before proceeding to checkout."
        />

        <div className="empty-cart-icon">
          🛒
        </div>

        <h2>Your cart is empty</h2>

        <p>
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/products"
          className="continue-shopping-btn"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Shopping Cart"
        description="Review your shopping cart before proceeding to checkout."
      />

      <h1 className="cart-title">
        Shopping Cart
      </h1>

      <div className="cart-page">

        <div className="cart-items">

          {items.map((item) => (
            <div
              key={item.id}
              className="cart-item"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-image"
                onClick={() =>
                  handleItemClick(item.id)
                }
              />

              <div className="cart-details">

                <h3
                  onClick={() =>
                    handleItemClick(item.id)
                  }
                >
                  {item.title}
                </h3>

                <p className="price">
                  ${item.price}
                </p>

                <div className="quantity-controls">

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        decreaseQuantity(item.id)
                      )
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        increaseQuantity(item.id)
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <p className="subtotal">
                  Subtotal: $
                  {(
                    item.price * item.quantity
                  ).toFixed(2)}
                </p>

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => {
                    dispatch(
                      removeFromCart(item.id)
                    );

                    showInfo(
                      `${item.title} removed from cart.`
                    );
                  }}
                >
                  <FiTrash2 aria-hidden="true" />
                  Remove
                </button>

              </div>
            </div>
          ))}

        </div>

        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total Items</span>
            <strong>{totalCartItems}</strong>
          </div>

          <div className="summary-row summary-total">
            <span>Total Price</span>
            <strong>${totalPrice}</strong>
          </div>

          <button
            type="button"
            className="checkout-btn"
            onClick={() => {
              if (
                !window.confirm(
                  "Please confirm to proceed to checkout."
                )
              ) {
                return;
              }

              navigate("/checkout");
            }}
          >
            Proceed to Checkout
          </button>

          <button
            type="button"
            className="clear-btn"
            onClick={() => {
              const confirmClear =
                window.confirm(
                  "Are you sure you want to clear your cart?"
                );

              if (confirmClear) {
                dispatch(clearCart());
                showInfo("Cart cleared.");
              }
            }}
          >
            Clear Cart
          </button>

        </div>

      </div>
    </>
  );
}

export default Cart;