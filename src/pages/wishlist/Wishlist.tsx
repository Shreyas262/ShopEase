import {
  removeFromWishlist,
  clearWishlist,
} from "../../app-store/slice/wishlistSlice";

import { addToCart } from "../../app-store/slice/cartSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../../app-store/storeHooks";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  showSuccess,
  showInfo,
} from "../../utils/toast";

import { FiTrash2 } from "react-icons/fi";

import SEO from "../../components/seo/SEO";

import "./wishlist.scss";

function Wishlist() {
  const wishlist = useAppSelector(
    (state) => state.wishlist.items
  );

  const cartItems = useAppSelector(
    (state) => state.cart.items
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleItemClick = (itemId: number) => {
    navigate(`/products/${itemId}`);
  };

  if (wishlist.length === 0) {
    return (
      <div className="empty-wishlist">
        <SEO
          title="Wishlist"
          description="View and manage the products you've saved for later."
        />

        <div className="empty-wishlist-icon">
          ❤️
        </div>

        <h2>Your wishlist is empty</h2>

        <p>
          Save products you love and they'll appear here.
        </p>

        <Link
          to="/products"
          className="continue-shopping-btn"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <SEO
        title="Wishlist"
        description="View and manage the products you've saved for later."
      />

      <div className="wishlist-header">
        <h1>My Wishlist</h1>

        <button
          type="button"
          className="clear-btn wishlist-clear-btn"
          onClick={() => {
            const confirmClear =
              window.confirm(
                "Are you sure you want to clear your wishlist?"
              );

            if (confirmClear) {
              dispatch(clearWishlist());
            }
          }}
        >
          Clear Wishlist
        </button>
      </div>

      <div className="wishlist-grid">
        {wishlist.map((product) => {
          const isInCart = cartItems.some(
            (item) => item.id === product.id
          );

          return (
            <article
              key={product.id}
              className="wishlist-card"
            >
              <div className="wishlist-image-wrap">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="wishlist-image"
                  loading="lazy"
                  onClick={() =>
                    handleItemClick(product.id)
                  }
                />

                <button
                  type="button"
                  className="wishlist-remove-btn"
                  aria-label={`Remove ${product.title} from wishlist`}
                  title="Remove from wishlist"
                  onClick={() => {
                    dispatch(
                      removeFromWishlist(product.id)
                    );

                    showInfo(
                      `${product.title} removed from wishlist.`
                    );
                  }}
                >
                  <FiTrash2 aria-hidden="true" />
                </button>
              </div>

              <div className="wishlist-body">
                <h3 className="wishlist-title">
                  <Link to={`/products/${product.id}`}>
                    {product.title}
                  </Link>
                </h3>

                <p className="wishlist-price">
                  ${product.price.toFixed(2)}
                </p>

                <div className="wishlist-actions">
                  <Link
                    to={`/products/${product.id}`}
                    className="wishlist-details-btn"
                  >
                    View Details
                  </Link>

                  <button
                    type="button"
                    disabled={isInCart}
                    onClick={() => {
                      dispatch(addToCart(product));

                      showSuccess(
                        `${product.title} added to cart.`
                      );
                    }}
                    className="wishlist-cart-btn"
                  >
                    {isInCart
                      ? "In Cart"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Wishlist;