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

  useEffect(() => {
    setInputValue(searchText);
  }, [searchText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.pathname === "/products") {
        updateSearchParam(
          "search",
          inputValue
        );
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [
    inputValue,
    location.pathname,
    updateSearchParam,
  ]);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();

    const search = inputValue.trim();

    if (location.pathname === "/products") {
      updateSearchParam(
        "search",
        search
      );
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(search)}`
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
    >
      <input
        type="search"
        placeholder="Search products..."
        value={inputValue}
        onChange={handleInputChange}
      />
    </form>
  );
}

export default SearchBar;