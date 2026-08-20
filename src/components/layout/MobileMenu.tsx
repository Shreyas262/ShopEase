import NavLinks from "./NavLinks";

import type { CartItem } from "../../types/cart";
import type { Product } from "../../types/product";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  wishlistItems: Product[];
  isAuthenticated: boolean;
}

function MobileMenu({
  isOpen,
  onClose,
  cartItems,
  wishlistItems,
  isAuthenticated,
}: MobileMenuProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="mobile-overlay"
        onClick={onClose}
      />

      <aside className="mobile-menu">

        <button
          className="mobile-close-btn"
          onClick={onClose}
          type="button"
        >
          ✕
        </button>

        <NavLinks
          cartItems={cartItems}
          wishlistItems={wishlistItems}
          isAuthenticated={isAuthenticated}
          onNavigate={onClose}
        />

      </aside>
    </>
  );
}

export default MobileMenu;