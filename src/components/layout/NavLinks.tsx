import { NavLink } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import type { CartItem } from "../../types/cart";
import type { Product } from "../../types/product";

interface NavLinksProps {
  cartItems: CartItem[];
  wishlistItems: Product[];
  isAuthenticated: boolean;
  onNavigate?: () => void;
}

function NavLinks({
  cartItems,
  wishlistItems,
  isAuthenticated,
  onNavigate,
}: NavLinksProps) {
  const getNavClass = ({
    isActive,
  }: {
    isActive: boolean;
  }): string => {
    return isActive ? "active" : "";
  };

  return (
    <ul className="nav-links">

      <li>
        <NavLink
          to="/"
          className={getNavClass}
          end
          onClick={onNavigate}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/products"
          className={getNavClass}
          onClick={onNavigate}
        >
          Products
        </NavLink>
      </li>

      <li>
        <SearchBar />
      </li>

      {isAuthenticated && (
        <li>
          <NavLink
            to="/cart"
            className={getNavClass}
            onClick={onNavigate}
          >
            Cart

            {cartItems.length > 0 && (
              <span className="badge">
                {cartItems.length}
              </span>
            )}
          </NavLink>
        </li>
      )}

      {isAuthenticated && (
        <li>
          <NavLink
            to="/wishlist"
            className={getNavClass}
            onClick={onNavigate}
          >
            Wishlist

            {wishlistItems.length > 0 && (
              <span className="badge">
                {wishlistItems.length}
              </span>
            )}
          </NavLink>
        </li>
      )}

      <li>
        <NavLink
          to={
            isAuthenticated
              ? "/profile"
              : "/login"
          }
          className={getNavClass}
          onClick={onNavigate}
        >
          {isAuthenticated
            ? "Profile"
            : "Login"}
        </NavLink>
      </li>

    </ul>
  );
}

export default NavLinks;