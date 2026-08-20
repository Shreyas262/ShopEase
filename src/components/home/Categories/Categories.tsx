import CategoryCard from "./CategoryCard";

import { getCategoryData } from "../../../utils/getCategoryData";
import "./categories.scss"
import { useGetProductsQuery } from "../../../app-store/shopApi";

function Categories() {
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetProductsQuery()

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p>
        Error fetching categories.
      </p>
    );
  }

  if (!productsData) {
    return null;
  }

  const categoryData =
    getCategoryData(
      productsData.products
    );

  return (
    <section
      className="categories-section"
      id="categories"
    >
      <div className="container categories-container">

        <div className="categories-text">
          <h2>Browse by Category</h2>

          <p>
            Find products by category and
            start shopping faster.
          </p>
        </div>

        <div className="categories-grid">
          {categoryData.map(
            (category) => (
              <CategoryCard
                key={category.slug}
                category={category}
              />
            )
          )}
        </div>

      </div>
    </section>
  );
}

export default Categories;