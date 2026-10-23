import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { FiSearch } from "react-icons/fi";

import useSearchParamUpdater from "../../hooks/useSearchParamUpdater";

import "./searchBar.scss";

function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    searchText,
    updateSearchParam,
  } = useSearchParamUpdater();

  const [inputValue, setInputValue] =
    useState(searchText);

  const [prevSearchText, setPrevSearchText] =
    useState(searchText);

  // Keep the input in sync when the URL's search changes from elsewhere
  // (e.g. "Clear filters" or browser back), without clobbering what the
  // user is typing.
  if (searchText !== prevSearchText) {
    setPrevSearchText(searchText);

    if (searchText !== inputValue.trim()) {
      setInputValue(searchText);
    }
  }

  const isProductsPage =
    location.pathname === "/products";

  useEffect(() => {
    // Only push to the URL when the typed text actually differs from it.
    // Otherwise every URL change (page, sort) would re-run this effect and
    // reset the page back to 1.
    if (
      !isProductsPage ||
      inputValue.trim() === searchText
    ) {
      return;
    }

    const timer = setTimeout(() => {
      updateSearchParam(
        "search",
        inputValue.trim()
      );
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [
    inputValue,
    searchText,
    isProductsPage,
    updateSearchParam,
  ]);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();

    const search = inputValue.trim();

    if (isProductsPage) {
      updateSearchParam(
        "search",
        search
      );
      return;
    }

    navigate(
      search
        ? `/products?search=${encodeURIComponent(search)}`
        : "/products"
    );
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue(e.target.value);
  };

  return (
    <form
      className="product-search"
      onSubmit={handleSubmit}
      role="search"
    >
      <FiSearch
        className="search-icon"
        aria-hidden="true"
      />

      <input
        type="search"
        placeholder="Search products..."
        aria-label="Search products"
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  );
}

export default SearchBar;
