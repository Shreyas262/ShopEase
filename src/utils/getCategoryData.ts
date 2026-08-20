import type { Product } from "../types/product";
import { formatCategoryName } from "./formatCategoryName";

export interface Category {
  slug: string;
  name: string;
  image: string;
}

export const getCategoryData = (
  products: Product[]
): Category[] => {
  const uniqueCategories = [
    ...new Set(
      products.map(
        (product) => product.category
      )
    ),
  ];

  return uniqueCategories.map(
    (category) => {
      const product = products.find(
        (product) =>
          product.category === category
      );

      if (!product) {
        throw new Error(
          `No product found for category: ${category}`
        );
      }

      return {
        slug: category,
        name: formatCategoryName(category),
        image: product.thumbnail,
      };
    }
  );
};