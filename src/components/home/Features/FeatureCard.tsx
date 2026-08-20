import type { ComponentType } from "react";

import "./features.scss";

interface Feature {
  id: number;
  icon: ComponentType;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
}

function FeatureCard({
  feature,
}: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div className="feature-card card">

      <div className="feature-icon">
        <Icon />
      </div>

      <h3 className="feature-title">
        {feature.title}
      </h3>

      <p className="feature-description">
        {feature.description}
      </p>

    </div>
  );
}

export default FeatureCard;