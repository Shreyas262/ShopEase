import { Link } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../app-store/storeHooks";

import { addToCart } from "../../app-store/slice/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../app-store/slice/wishlistSlice";

import {
  showSuccess,
  showInfo,
} from "../../utils/toast";

import type { Product } from "../../types/product";

import "./productCard.scss";

type ProductCardVariant =
  | "compact"
  | "detailed";

interface ProductCardProps {
  product: Product;
  variant: ProductCardVariant;
}

function ProductCard({
  product,
  variant,
}: ProductCardProps) {
  const wishlist = useAppSelector(
    (state) => state.wishlist.items
  );

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  const dispatch = useAppDispatch();

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(
        removeFromWishlist(product.id)
      );

      showInfo(
        `${product.title} removed from wishlist.`
      );
    } else {
      dispatch(addToWishlist(product));

      showSuccess(
        `${product.title} added to wishlist.`
      );
    }
  };

  if (variant === "compact") {
    return (
      <div className="product-card">

        <div className="product-image">
          <img
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="product-content">
          <h2 className="product-title">
            {product.title}
          </h2>

          <p className="product-price">
            ${product.price}
          </p>
        </div>

        <div className="product-actions">
          <Link
            className="details-btn"
            to={`/products/${product.id}`}
          >
            View Details
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="product-card">

      <div className="product-image">

        <img
          src={product.thumbnail}
          alt={product.title}
        />

        {isAuthenticated && (
          <button
            type="button"
            className="wishlist-btn"
            onClick={handleWishlistToggle}
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>
        )}

      </div>

      <div className="product-content">

        <h2 className="product-title">
          {product.title}
        </h2>

        <p className="product-category">
          {product.category}
        </p>

        <p className="product-rating">
          ⭐ {product.rating}
        </p>

        <p className="product-price">
          ${product.price}
        </p>

      </div>

      <div className="product-actions">

        <Link
          className="details-btn"
          to={`/products/${product.id}`}
        >
          View Details
        </Link>

        {isAuthenticated && (
          <button
            type="button"
            className="cart-btn"
            onClick={() => {
              dispatch(addToCart(product));

              showSuccess(
                `${product.title} added to cart.`
              );
            }}
          >
            Add to Cart
          </button>
        )}

      </div>

    </div>
  );
}

export default ProductCard;