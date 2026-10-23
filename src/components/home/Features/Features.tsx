import {
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaHeadset,
} from "react-icons/fa";

import type { ComponentType } from "react";

import FeatureCard from "./FeatureCard";

import "./features.scss";

interface Feature {
  id: number;
  icon: ComponentType;
  title: string;
  description: string;
}

function Features() {
  const features: Feature[] = [
    {
      id: 1,
      icon: FaTruck,
      title: "Fast Delivery",
      description:
        "Get your orders delivered quickly and safely to your doorstep.",
    },
    {
      id: 2,
      icon: FaShieldAlt,
      title: "Secure Payments",
      description:
        "Shop with confidence using safe and encrypted payment methods.",
    },
    {
      id: 3,
      icon: FaStar,
      title: "Premium Quality",
      description:
        "Every product is carefully selected to ensure the highest quality.",
    },
    {
      id: 4,
      icon: FaHeadset,
      title: "24/7 Support",
      description:
        "Our support team is always ready to help whenever you need us.",
    },
  ];

  return (
    <section className="features-section">

      <div className="container features-container">

        <div className="section-heading">

          <h2>Why Choose Us</h2>

          <p>
            We are committed to providing the
            best shopping experience with
            quality products, secure payments,
            and exceptional customer service.
          </p>

        </div>

        <div className="features-grid">
          {features.map(
            (feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
              />
            )
          )}
        </div>

      </div>

    </section>
  );
}

export default Features;