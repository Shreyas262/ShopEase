import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import { useGetProductQuery } from "../../app-store/shopApi";
import { skipToken } from "@reduxjs/toolkit/query";

import { addToCart } from "../../app-store/slice/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../app-store/slice/wishlistSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../../app-store/storeHooks";

import ProductDetailsSkeleton from "../../components/skeletons/ProductDetailsSkeleton";

import { showInfo, showSuccess } from "../../utils/toast";
import SEO from "../../components/seo/SEO";

import "./productDetails.scss";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const cartItems = useAppSelector(
    (state) => state.cart.items
  );

  const wishlistItems = useAppSelector(
    (state) => state.wishlist.items
  );

  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  const [selectedImage, setSelectedImage] =
    useState(0);

  const [showZoom, setShowZoom] =
    useState(false);

  const productID = Number(id);

  const {
    data: productDetails,
    isLoading,
    isError,
  } = useGetProductQuery(
    Number.isInteger(productID)
      ? productID
      : skipToken
  );

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setShowZoom(false);
      }
    };

    if (showZoom) {
      document.body.style.overflow = "hidden";

      window.addEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [showZoom]);

  if (!id || !Number.isInteger(productID)) {
    return <p>Invalid product ID.</p>;
  }

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError) {
    return (
      <p>
        Something went wrong while loading product details.
      </p>
    );
  }

  if (!productDetails) {
    return <p>Product not found.</p>;
  }

  const isInCart = cartItems.some(
    (item) => item.id === productDetails.id
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === productDetails.id
  );

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(
        removeFromWishlist(productDetails.id)
      );

      showInfo(
        `${productDetails.title} removed from wishlist.`
      );
    } else {
      dispatch(
        addToWishlist(productDetails)
      );

      showSuccess(
        `${productDetails.title} added to wishlist.`
      );
    }
  };

  const handleNext = () => {
    setSelectedImage(
      (previous) =>
        (previous + 1) %
        productDetails.images.length
    );
  };

  const handlePrevious = () => {
    setSelectedImage(
      (previous) =>
        previous === 0
          ? productDetails.images.length - 1
          : previous - 1
    );
  };

  const handleAddToCart = () => {
    if (isAuthenticated) {
      dispatch(
        addToCart(productDetails)
      );

      showSuccess(
        `${productDetails.title} added to cart.`
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="product-details-container">

      <SEO
        title={productDetails.title}
        description={productDetails.description}
        image={productDetails.thumbnail}
        type="product"
      />

      <div className="product-gallery">

        <div className="main-image">
          <img
            src={
              productDetails.images[
                selectedImage
              ]
            }
            alt={productDetails.title}
            onClick={() =>
              setShowZoom(true)
            }
          />
        </div>

        <div className="thumbnail-list">
          {productDetails.images.map(
            (image, index) => (
              <img
                key={image}
                src={image}
                alt={`${productDetails.title} ${index + 1}`}
                className={
                  selectedImage === index
                    ? "thumbnail active-thumbnail"
                    : "thumbnail"
                }
                onClick={() =>
                  setSelectedImage(index)
                }
              />
            )
          )}
        </div>

        {showZoom && (
          <div
            className="image-modal"
            onClick={() =>
              setShowZoom(false)
            }
          >
            <div
              className="modal-content"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <button
                type="button"
                className="close-btn"
                onClick={() =>
                  setShowZoom(false)
                }
              >
                ✕
              </button>

              <button
                type="button"
                className="prev-btn"
                onClick={handlePrevious}
              >
                ❮
              </button>

              <img
                src={
                  productDetails.images[
                    selectedImage
                  ]
                }
                alt={productDetails.title}
              />

              <button
                type="button"
                className="next-btn"
                onClick={handleNext}
              >
                ❯
              </button>

              <p className="image-counter">
                {selectedImage + 1} /{" "}
                {productDetails.images.length}
              </p>
            </div>
          </div>
        )}

      </div>

      <div className="product-info">

        <div className="title-row">

          <h1 className="product-title">
            {productDetails.title}
          </h1>

          {isAuthenticated && (
            <button
              type="button"
              className="details-wishlist-btn"
              onClick={
                handleWishlistToggle
              }
            >
              {isWishlisted
                ? "❤️"
                : "🤍"}
            </button>
          )}

        </div>

        <p className="product-description">
          {productDetails.description}
        </p>

        <p className="product-price">
          ${productDetails.price}
        </p>

        <p className="product-rating">
          ⭐ {productDetails.rating}
        </p>

        <button
          type="button"
          disabled={isInCart}
          onClick={handleAddToCart}
          className="cart-btn"
        >
          {isInCart
            ? "Already in Cart"
            : "Add to Cart"}
        </button>

        <div className="product-specifications">

          <h3>Specifications</h3>

          <dl className="spec-list">

            {productDetails.brand && (
              <>
                <dt>Brand</dt>
                <dd>
                  {productDetails.brand}
                </dd>
              </>
            )}

            <dt>Category</dt>
            <dd>
              {productDetails.category}
            </dd>

            <dt>Weight</dt>
            <dd>
              {productDetails.weight}
            </dd>

          </dl>

          <div className="product-tags">

            <h4>Tags</h4>

            <ul>
              {productDetails.tags.map(
                (tag) => (
                  <li key={tag}>
                    {tag}
                  </li>
                )
              )}
            </ul>

          </div>

          <div className="product-dimensions">

            <h4>Dimensions</h4>

            <ul>
              <li>
                Width:{" "}
                {productDetails.dimensions.width}
              </li>

              <li>
                Height:{" "}
                {productDetails.dimensions.height}
              </li>

              <li>
                Depth:{" "}
                {productDetails.dimensions.depth}
              </li>
            </ul>

          </div>

        </div>

        <div className="shipping-info">

          <h3>Shipping & Returns</h3>

          <p>
            {productDetails.availabilityStatus} (
            {productDetails.stock} left)
          </p>

          <p>
            Shipping Information:{" "}
            {productDetails.shippingInformation}
          </p>

          <p>
            Warranty Information:{" "}
            {productDetails.warrantyInformation}
          </p>

          <p>
            Return Policy:{" "}
            {productDetails.returnPolicy}
          </p>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;