import { NavLink } from "react-router-dom";
import { useState } from "react";

import {
  useAppSelector,
} from "../../app-store/storeHooks";

import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

import "./navbar.scss";

function Navbar() {
  const cartItems = useAppSelector(
    (state) => state.cart.items
  );

  const wishlistItems = useAppSelector(
    (state) => state.wishlist.items
  );

  const isAuthenticated =
    useAppSelector(
      (state) =>
        state.auth.isAuthenticated
    );

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  return (
    <header className="header">

      <div className="logo">
        <NavLink to="/">
          ShopEase
        </NavLink>
      </div>

      <nav className="navbar">

        <div className="desktop-nav">
          <NavLinks
            cartItems={cartItems}
            wishlistItems={wishlistItems}
            isAuthenticated={
              isAuthenticated
            }
          />
        </div>

        <button
          className="hamburger-btn"
          onClick={() =>
            setIsMenuOpen(true)
          }
          type="button"
        >
          ☰
        </button>

      </nav>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() =>
          setIsMenuOpen(false)
        }
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        isAuthenticated={
          isAuthenticated
        }
      />

    </header>
  );
}

export default Navbar;