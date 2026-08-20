import { useMemo, type ChangeEvent } from "react";
import { useGetProductsQuery } from "../../app-store/shopApi";
import ProductCard from "../../components/product/ProductCard";
import useSearchParamUpdater from "../../hooks/useSearchParamUpdater";
import ProductsSkeleton from "../../components/skeletons/ProductsSkeleton";
import SEO from "../../components/seo/SEO";
import "../../components/skeletons/skeleton.scss";
import "./products.scss";

function Products() {
  
  const {
    searchText,
    selectedCategory,
    sortBy,
    currentPage,
    updateSearchParam,
  } = useSearchParamUpdater();

  const productsPerPage = 12;

  const {
    data: productsData,
    isLoading,
    isError,
    
  } = useGetProductsQuery();

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (isError) {
    return <p>Something went wrong while loading products.</p>;
  }

  if (!productsData) {
    return null;
  }

  const categories = useMemo(() => {
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
    let filtered = productsData.products;

    if (searchText.trim()) {
      filtered = filtered.filter((product) =>
        product.title
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          )
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

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length /
        productsPerPage
    )
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const endIndex =
    startIndex + productsPerPage;

  const paginatedProducts =
    filteredProducts.slice(
      startIndex,
      endIndex
    );

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

  const handleNextPage = () => {
    if (currentPage >= totalPages) {
      return;
    }

    updateSearchParam(
      "page",
      currentPage + 1
    );
  };

  const handlePreviousPage = () => {
    if (currentPage <= 1) {
      return;
    }

    updateSearchParam(
      "page",
      currentPage - 1
    );
  };

  return (
    <div className="products-page">
      <SEO
        title="Products"
        description="Browse products by category."
      />

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
              className={
                selectedCategory === category
                  ? "category-btn active-category"
                  : "category-btn"
              }
            >
              {category}
            </button>
          ))}
        </div>

        <div className="sort-container">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="default">
              Default
            </option>

            <option value="price-asc">
              Price: Low to High
            </option>

            <option value="price-desc">
              Price: High to Low
            </option>

            <option value="rating">
              Rating
            </option>
          </select>
        </div>

      </div>

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

      <div className="pagination">

        <button
          type="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          type="button"
          onClick={handleNextPage}
          disabled={
            currentPage === totalPages
          }
        >
          Next
        </button>

      </div>
    </div>
  );
}

export default Products;