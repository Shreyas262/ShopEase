import "./skeleton.scss";

function ProductDetailsSkeleton() {
  return (
    <section className="product-details-container">

      <div className="product-gallery">

        <div className="skeleton skeleton-product-image" />

        <div className="thumbnail-list">

          {Array.from({ length: 4 }).map(
            (_, index) => (
              <div
                key={index}
                className="skeleton skeleton-thumbnail"
              />
            )
          )}

        </div>

      </div>

      <div className="product-info">

        <div className="title-row">

          <div className="skeleton skeleton-heading" />

          <div className="skeleton skeleton-icon" />

        </div>

        <div className="skeleton skeleton-text" />

        <div className="skeleton skeleton-text" />

        <div className="skeleton skeleton-text short" />

        <div className="skeleton skeleton-price" />

        <div className="skeleton skeleton-rating" />

        <div className="skeleton skeleton-large-button" />

        <div className="product-specifications">

          <div className="skeleton skeleton-subheading" />

          {Array.from({ length: 3 }).map(
            (_, index) => (
              <div
                key={index}
                className="skeleton skeleton-spec"
              />
            )
          )}

        </div>

        <div className="shipping-info">

          <div className="skeleton skeleton-subheading" />

          {Array.from({ length: 4 }).map(
            (_, index) => (
              <div
                key={index}
                className="skeleton skeleton-text"
              />
            )
          )}

        </div>

      </div>

    </section>
  );
}

export default ProductDetailsSkeleton;