import { useSearchParams } from "react-router-dom";

type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "rating";

type SearchParamKey =
  | "search"
  | "category"
  | "sort"
  | "page";

type SearchParamValue =
  | string
  | number
  | null
  | undefined;

interface SearchParamUpdaterReturn {
  searchText: string;
  selectedCategory: string;
  sortBy: SortOption;
  currentPage: number;
  updateSearchParam: (
    key: SearchParamKey,
    value: SearchParamValue
  ) => void;
  clearFilters: () => void;
}

function useSearchParamUpdater(): SearchParamUpdaterReturn {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const searchText =
    searchParams.get("search") || "";

  const selectedCategory =
    searchParams.get("category") || "All";

  const rawSort =
    searchParams.get("sort") || "default";

  const sortBy: SortOption =
    rawSort === "price-asc" ||
    rawSort === "price-desc" ||
    rawSort === "rating"
      ? rawSort
      : "default";

  const rawPage = Number(searchParams.get("page"));

  // Anything that isn't a positive whole number (e.g. "-1", "1.5", "abc") means page 1.
  const currentPage =
    Number.isInteger(rawPage) && rawPage > 0
      ? rawPage
      : 1;

  const updateSearchParam = (
    key: SearchParamKey,
    value: SearchParamValue
  ): void => {
    const params = new URLSearchParams(
      searchParams
    );

    if (
      value === "" ||
      value === null ||
      value === undefined ||
      value === "All" ||
      value === "default"
    ) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }

    const filterKeys: SearchParamKey[] = [
      "search",
      "category",
      "sort",
    ];

    if (filterKeys.includes(key)) {
      params.delete("page");
    }

    setSearchParams(params);
  };

  const clearFilters = (): void => {
    const params = new URLSearchParams(
      searchParams
    );

    params.delete("search");
    params.delete("category");
    params.delete("page");

    setSearchParams(params);
  };

  return {
    searchText,
    selectedCategory,
    sortBy,
    currentPage,
    updateSearchParam,
    clearFilters,
  };
}

export default useSearchParamUpdater;