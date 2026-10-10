import type { Category, Product } from "@/lib/types";

const API_URL =
  process.env.BAZAR_DOR_API_URL ??
  "https://api.api-store.workers.dev/api/bazardor";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(
      `Bazar Dor API request failed (${response.status} ${response.statusText})`,
    );
  }

  return response.json() as Promise<T>;
}

export function getProducts() {
  return fetchJson<Product[]>("/products");
}

export function getProductsByCategory(slug: string) {
  return fetchJson<Product[]>(`/products?category=${encodeURIComponent(slug)}`);
}

export function getProduct(slug: string) {
  return fetchJson<Product>(`/products/${encodeURIComponent(slug)}`);
}

export function getCategories() {
  return fetchJson<Category[]>("/categories");
}
