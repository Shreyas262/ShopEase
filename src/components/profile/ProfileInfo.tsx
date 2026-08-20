import { Link } from "react-router-dom";

import { useAppSelector } from "../../app-store/storeHooks";

import { loadOrders } from "../../utils/localStorage";

function ProfileInfo() {
  const user = useAppSelector(
    (state) => state.auth.user
  );

  const cartItems = useAppSelector(
    (state) => state.cart.items
  );

  const wishlistItems = useAppSelector(
    (state) => state.wishlist.items
  );

  if (!user) {
    return null;
  }

  const orders = loadOrders()[user.id] ?? [];

  const defaultAddress = user.addresses[0];

  const userAddress = defaultAddress
    ? `${defaultAddress.flatHouse}, ${defaultAddress.buildingStreet}, ${defaultAddress.city} - ${defaultAddress.zipcode}`
    : "";

  return (
    <div className="profile-info card">
      <h3>Account Information</h3>

      <div className="profile-info-item">
        <span>Default Address</span>

        <span>
          {defaultAddress
            ? userAddress
            : "No default address"}
        </span>
      </div>

      <div className="profile-info-item">
        <span>
          <Link to="/cart">
            Cart Items
          </Link>
        </span>

        <span>{cartItems.length}</span>
      </div>

      <div className="profile-info-item">
        <span>
          <Link to="/wishlist">
            Wishlist Items
          </Link>
        </span>

        <span>{wishlistItems.length}</span>
      </div>

      <div className="profile-info-item">
        <span>
          <Link to="/orders">
            Orders
          </Link>
        </span>

        <span>{orders.length}</span>
      </div>
    </div>
  );
}

export default ProfileInfo;