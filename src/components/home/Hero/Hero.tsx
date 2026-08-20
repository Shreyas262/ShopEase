import { Link } from "react-router-dom";

import heroImage from "../../../assets/images/heroImage.png";

import "./hero.scss";

function Hero() {
  return (
    <section className="hero-section">
      <div className="container hero-container">

        <div className="hero-content">

          <div className="hero-text">

            <h1>
              Shop Smarter,
              <br />
              Live Better.
            </h1>

            <p>
              Discover premium products at
              unbeatable prices. From everyday
              essentials to the latest gadgets,
              everything you need in one place.
            </p>

          </div>

          <div className="hero-buttons">

            <Link
              to="/products"
              className="primary-btn"
            >
              Shop Now
            </Link>

            <a
              href="#categories"
              className="secondary-btn"
            >
              Explore Categories
            </a>

          </div>

        </div>

        <div className="hero-image">
          <img
            src={heroImage}
            alt="Online shopping illustration"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;