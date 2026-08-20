import { useAppDispatch } from "../../app-store/storeHooks";
import { useNavigate } from "react-router-dom";

import { logout } from "../../app-store/slice/authSlice";
import { clearCart } from "../../app-store/slice/cartSlice";
import { clearWishlist } from "../../app-store/slice/wishlistSlice";

function LogoutButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to Logout?"
    );

    if (!confirmLogout) {
      return;
    }

    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearWishlist());

    navigate("/login");
  };

  return (
    <button
      type="button"
      className="button logout-btn"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;