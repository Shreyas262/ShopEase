import { Link } from "react-router-dom";

import CategoryCard from "./CategoryCard";

import { getCategoryData } from "../../../utils/getCategoryData";
import "../../skeletons/skeleton.scss";
import "./categories.scss"
import { useGetProductsQuery } from "../../../app-store/shopApi";

// Show a curated handful on the home page; the full list lives on /products.
const HOME_CATEGORY_LIMIT = 8;

function Categories() {
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetProductsQuery()

  if (isError) {
    return null;
  }

  const categoryData = productsData
    ? getCategoryData(
        productsData.products
      ).slice(0, HOME_CATEGORY_LIMIT)
    : [];

  return (
    <section
      className="categories-section"
      id="categories"
    >
      <div className="container categories-container">

        <div className="section-heading">
          <h2>Browse by Category</h2>

          <p>
            Find products by category and
            start shopping faster.
          </p>
        </div>

        <div className="categories-grid">
          {isLoading
            ? Array.from({ length: HOME_CATEGORY_LIMIT }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="category-card card skeleton-card"
                  >
                    <div className="skeleton skeleton-category-image" />
                  </div>
                )
              )
            : categoryData.map(
                (category) => (
                  <CategoryCard
                    key={category.slug}
                    category={category}
                  />
                )
              )}
        </div>

        <div className="categories-action">
          <Link
            to="/products"
            className="button"
          >
            Browse all categories
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Categories;