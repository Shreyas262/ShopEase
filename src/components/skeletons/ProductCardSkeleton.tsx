import "./skeleton.scss";

function ProductCardSkeleton() {
  return (
    <article className="product-card card">

      <div className="skeleton skeleton-image" />

      <div className="product-info">

        <div className="skeleton skeleton-title" />

        <div className="skeleton skeleton-category" />

        <div className="skeleton skeleton-price" />

        <div className="skeleton skeleton-rating" />

        <div className="product-actions">

          <div className="skeleton skeleton-button" />

          <div className="skeleton skeleton-button" />

        </div>

      </div>

    </article>
  );
}

export default ProductCardSkeleton;