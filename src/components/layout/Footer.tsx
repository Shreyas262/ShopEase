import { Link } from "react-router-dom";

import {
  useAppSelector,
} from "../../app-store/storeHooks";

import "./footer.scss";

function Footer() {
  const isAuthenticated =
    useAppSelector(
      (state) =>
        state.auth.isAuthenticated
    );

  return (
    <footer className="footer">

      <div className="container footer-container">

        <section className="footer-brand">

          <Link to="/">
            <h2>ShopEase</h2>
          </Link>

          <p>
            Your one-stop destination for
            quality products at competitive
            prices.
          </p>

        </section>

        <nav className="footer-links">

          <h3>Quick Links</h3>

          <ul>

            <li>
              <Link to="/">
                Home
              </Link>
            </li>

            <li>
              <Link to="/products">
                Products
              </Link>
            </li>

            {isAuthenticated && (
              <>
                <li>
                  <Link to="/cart">
                    Cart
                  </Link>
                </li>

                <li>
                  <Link to="/wishlist">
                    Wishlist
                  </Link>
                </li>

                <li>
                  <Link to="/profile">
                    Profile
                  </Link>
                </li>
              </>
            )}

            {!isAuthenticated && (
              <li>
                <Link to="/login">
                  Login
                </Link>
              </li>
            )}

          </ul>

        </nav>

        <section className="footer-contact">

          <h3>Contact</h3>

          <p>
            <strong>Email:</strong>
            <span>
              {" "}
              support@shopease.com
            </span>
          </p>

          <p>
            <strong>Phone:</strong>
            <span>
              {" "}
              +91 98765 43210
            </span>
          </p>

          <p>
            <strong>Location:</strong>
            <span> India</span>
          </p>

        </section>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 ShopEase. All rights reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;