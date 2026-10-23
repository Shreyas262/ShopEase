import { Link } from "react-router-dom";

import { FaHeart, FaStar } from "react-icons/fa";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

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
import { formatCategoryName } from "../../utils/formatCategoryName";

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

  const productUrl = `/products/${product.id}`;

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

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    showSuccess(
      `${product.title} added to cart.`
    );
  };

  const isDetailed = variant === "detailed";

  return (
    <article className={`product-card product-card--${variant}`}>

      <div className="product-image">
        <Link
          to={productUrl}
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={product.thumbnail}
            alt=""
            loading="lazy"
          />
        </Link>

        {isDetailed && isAuthenticated && (
          <button
            type="button"
            className={
              isWishlisted
                ? "wishlist-btn is-active"
                : "wishlist-btn"
            }
            onClick={handleWishlistToggle}
            aria-pressed={isWishlisted}
            aria-label={
              isWishlisted
                ? `Remove ${product.title} from wishlist`
                : `Add ${product.title} to wishlist`
            }
          >
            {isWishlisted ? <FaHeart /> : <FiHeart />}
          </button>
        )}
      </div>

      <div className="product-content">

        {isDetailed && (
          <span className="product-category">
            {formatCategoryName(product.category)}
          </span>
        )}

        <h2 className="product-title">
          <Link to={productUrl}>
            {product.title}
          </Link>
        </h2>

        <div className="product-meta">
          <p className="product-price">
            ${product.price.toFixed(2)}
          </p>

          {isDetailed && (
            <p
              className="product-rating"
              aria-label={`Rated ${product.rating.toFixed(1)} out of 5`}
            >
              <FaStar aria-hidden="true" />
              {product.rating.toFixed(1)}
            </p>
          )}
        </div>

      </div>

      <div className="product-actions">

        <Link
          className="details-btn"
          to={productUrl}
        >
          View Details
        </Link>

        {isDetailed && isAuthenticated && (
          <button
            type="button"
            className="cart-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
          >
            <FiShoppingCart aria-hidden="true" />
            <span>Add</span>
          </button>
        )}

      </div>

    </article>
  );
}

export default ProductCard;
