import ProductCardSkeleton from "./ProductCardSkeleton";
import './skeleton.scss'

function ProductsSkeleton() {
  return (
    <section className="products-page">

      <div className="products-heading">
        <div className="skeleton skeleton-search" />
      </div>

      <div className="filter-section">

        <div className="categories">

          {Array.from({ length: 6 }).map(
            (_, index) => (
              <div
                key={index}
                className="skeleton skeleton-category-btn"
              />
            )
          )}

        </div>

        <div className="skeleton skeleton-select" />

      </div>

      <div className="products-grid">

        {Array.from({ length: 12 }).map(
          (_, index) => (
            <ProductCardSkeleton
              key={index}
            />
          )
        )}

      </div>

      <div className="pagination">

        <div className="skeleton skeleton-pagination-btn" />

        <div className="skeleton skeleton-page-number" />

        <div className="skeleton skeleton-pagination-btn" />

      </div>

    </section>
  );
}

export default ProductsSkeleton;