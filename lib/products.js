import products from "@/data/products.json";

export function getAllProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category) {
  return products.filter((p) => p.category === category);
}

export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}

export function getCategories() {
  return [...new Set(products.map((p) => p.category))];
}
