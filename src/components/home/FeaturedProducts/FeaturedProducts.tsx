import { Link } from "react-router-dom";

import ProductCard from "../../product/ProductCard";
import ProductCardSkeleton from "../../skeletons/ProductCardSkeleton";

import "./featuredProducts.scss";
import { useGetProductsQuery } from "../../../app-store/shopApi";

function FeaturedProducts() {
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetProductsQuery();

  if (isError) {
    return (
      <section className="featured-products-section">
        <div className="container">
          <div className="state-message">
            <h2>Couldn't load featured products</h2>
            <p>Please check your connection and try again.</p>
          </div>
        </div>
      </section>
    );
  }

  // Top-rated products make a better showcase than the first few in the catalog.
  const featuredProducts = productsData
    ? [...productsData.products]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8)
    : [];

  return (
    <section className="featured-products-section">
      <div className="container featured-products-container">

        <div className="section-heading">
          <h2>Featured Products</h2>

          <p>
            Our highest-rated products,
            loved by shoppers like you.
          </p>
        </div>

        <div className="featured-products-grid">
          {isLoading
            ? Array.from({ length: 8 }).map(
                (_, index) => (
                  <ProductCardSkeleton key={index} />
                )
              )
            : featuredProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant="detailed"
                  />
                )
              )}
        </div>

        <div className="featured-products-action">
          <Link
            to="/products"
            className="button"
          >
            View All Products
          </Link>
        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;