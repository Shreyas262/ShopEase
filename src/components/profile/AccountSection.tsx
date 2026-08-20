import { Link } from "react-router-dom";

function AccountSection() {
    return (
        <section className="account-section card">

            <h3>Account</h3>

            <div className="account-links">

                <Link
                    to="/orders"
                    className="account-link"
                >
                    📦 My Orders
                </Link>

                <Link
                    to="/wishlist"
                    className="account-link"
                >
                    ❤️ Wishlist
                </Link>

                <Link
                    to="/cart"
                    className="account-link"
                >
                    🛒 My Cart
                </Link>

            </div>

        </section>
    );
}

export default AccountSection;