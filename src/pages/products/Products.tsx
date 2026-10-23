import { useMemo, type ChangeEvent } from "react";
import { useGetProductsQuery } from "../../app-store/shopApi";
import ProductCard from "../../components/product/ProductCard";
import useSearchParamUpdater from "../../hooks/useSearchParamUpdater";
import ProductsSkeleton from "../../components/skeletons/ProductsSkeleton";
import SEO from "../../components/seo/SEO";
import { formatCategoryName } from "../../utils/formatCategoryName";
import "../../components/skeletons/skeleton.scss";
import "./products.scss";

const PRODUCTS_PER_PAGE = 12;

function Products() {

  const {
    searchText,
    selectedCategory,
    sortBy,
    currentPage,
    updateSearchParam,
    clearFilters,
  } = useSearchParamUpdater();

  const {
    data: productsData,
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery();

  // Hooks must run on every render, so they come before the early returns
  // and handle the "no data yet" case themselves.
  const categories = useMemo(() => {
    if (!productsData) {
      return ["All"];
    }

    const allCategories = [
      ...new Set(
        productsData.products.map(
          (product) => product.category
        )
      ),
    ];

    return ["All", ...allCategories];
  }, [productsData]);

  const filteredProducts = useMemo(() => {
    if (!productsData) {
      return [];
    }

    let filtered = productsData.products;

    const query = searchText.trim().toLowerCase();

    if (query) {
      filtered = filtered.filter((product) =>
        product.title
          .toLowerCase()
          .includes(query)
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) =>
          product.category === selectedCategory
      );
    }

    const sorted = [...filtered];

    switch (sortBy) {
      case "price-asc":
        sorted.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-desc":
        sorted.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "rating":
        sorted.sort(
          (a, b) => b.rating - a.rating
        );
        break;

      default:
        break;
    }

    return sorted;
  }, [
    productsData,
    searchText,
    selectedCategory,
    sortBy,
  ]);

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (isError) {
    return (
      <div className="products-page">
        <div className="state-message">
          <h2>Couldn't load products</h2>
          <p>Something went wrong while loading products.</p>
          <button
            type="button"
            className="button"
            onClick={() => refetch()}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!productsData) {
    return null;
  }

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
        PRODUCTS_PER_PAGE
    )
  );

  // Out-of-range page numbers in the URL fall back to the nearest valid page.
  const page = Math.min(currentPage, totalPages);

  const startIndex =
    (page - 1) * PRODUCTS_PER_PAGE;

  const paginatedProducts =
    filteredProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE
    );

  const hasActiveFilters =
    searchText.trim() !== "" ||
    selectedCategory !== "All";

  const handleCategoryClick = (
    category: string
  ) => {
    updateSearchParam(
      "category",
      category
    );
  };

  const handleSortChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    updateSearchParam(
      "sort",
      event.target.value
    );
  };

  const goToPage = (nextPage: number) => {
    updateSearchParam("page", nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="products-page">
      <SEO
        title="Products"
        description="Browse products by category."
      />

      <div className="products-heading">
        <h1>
          {selectedCategory === "All"
            ? "All Products"
            : formatCategoryName(selectedCategory)}
        </h1>

        <p className="results-count">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? "product"
            : "products"}
          {searchText.trim() && (
            <> for “{searchText.trim()}”</>
          )}
        </p>
      </div>

      <div className="filter-section">

        <div className="categories">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() =>
                handleCategoryClick(
                  category
                )
              }
              aria-pressed={selectedCategory === category}
              className={
                selectedCategory === category
                  ? "category-btn active-category"
                  : "category-btn"
              }
            >
              {category === "All"
                ? category
                : formatCategoryName(category)}
            </button>
          ))}
        </div>

        <div className="sort-container">
          <label
            htmlFor="sort-select"
            className="visually-hidden"
          >
            Sort products
          </label>

          <select
            id="sort-select"
            value={sortBy}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="default">
              Sort: Featured
            </option>

            <option value="price-asc">
              Price: Low to High
            </option>

            <option value="price-desc">
              Price: High to Low
            </option>

            <option value="rating">
              Top Rated
            </option>
          </select>
        </div>

      </div>

      {paginatedProducts.length === 0 ? (
        <div className="state-message">
          <h2>No products found</h2>
          <p>Try a different search term or category.</p>
          {hasActiveFilters && (
            <button
              type="button"
              className="button"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="products-grid">
          {paginatedProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="detailed"
              />
            )
          )}
        </div>
      )}

      {totalPages > 1 && (
        <nav
          className="pagination"
          aria-label="Pagination"
        >

          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>

        </nav>
      )}
    </div>
  );
}

export default Products;
