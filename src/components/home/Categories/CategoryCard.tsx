import { Link } from "react-router-dom";

import type { Category } from "../../../types/category";

import "./categoryCard.scss";

interface CategoryCardProps {
  category: Category;
}

function CategoryCard({
  category,
}: CategoryCardProps) {
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="category-card card"
    >
      <img
        src={category.image}
        alt={`${category.name} category`}
        className="category-image"
      />

      <p className="category-name">
        {category.name}
      </p>
    </Link>
  );
}

export default CategoryCard;