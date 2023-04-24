import { http } from "../core/http";
import type { SearchProductsResult } from "../types/search-products-result";
import type { SearchResult } from "../types/search-result";

export async function search(query: string): Promise<SearchResult> {
  return http.get("/suggestions", { term: query });
}

export async function searchProducts(
  query: string
): Promise<SearchProductsResult> {
  return http.get("/suggestions", { term: query, products: "1" });
}
