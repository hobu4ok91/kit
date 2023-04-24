import type { SearchProductsResult } from "../types/search-products-result";
import type { Readable, Writable } from "svelte/store";
import { writable, derived } from "svelte/store";
import { debounce } from "ts-debounce";
import { query, searchResult } from "./search";
import { currentItem, Entity, entity, index } from "./selectable";
import type { Suggestion } from "../types/suggestion";
import type { Product } from "../types/product";
import { searchProducts } from "../api/search";

export interface ProductsResult {
  products: Product[];
  hasMore: boolean;
  expression: string;
}

export const cachedResponses: Writable<{
  [query: string]: SearchProductsResult;
}> = writable({});

export const loadProducts = debounce(async (query: string) => {
  const response = await searchProducts(query);

  cachedResponses.update(($cachedResponses) => {
    $cachedResponses[query] = response;

    return $cachedResponses;
  });
}, 300);

export const productsResult: Readable<ProductsResult> = derived(
  [searchResult, cachedResponses, index, entity, currentItem],
  ([$searchResult, $cachedResponses, $index, $entity, $currentItem]) => {
    const result: ProductsResult = {
      products: [],
      hasMore: false,
      expression: "",
    };

    if ($index === null || ($index === 0 && $entity === Entity.suggestion)) {
      result.products = $searchResult?.products ?? [];
      result.expression = $searchResult?.expression ?? "";
      result.hasMore = $searchResult?.hasMoreProducts ?? false;
    } else if ($entity === Entity.suggestion) {
      const suggestion = $currentItem as Suggestion | undefined;
      const cachedResponse = $cachedResponses[suggestion?.suggestion];

      result.products = cachedResponse?.products ?? [];
      result.hasMore = cachedResponse?.hasMoreProducts ?? false;
      result.expression = suggestion?.suggestion;
    } else if ($entity === Entity.history) {
      const historyQuery = $currentItem as string;
      const cachedResponse = $cachedResponses[historyQuery];

      result.products = cachedResponse?.products ?? [];
      result.hasMore = cachedResponse?.hasMoreProducts ?? false;
      result.expression = historyQuery;
    }

    return result;
  }
);

// очищаем все продукты если изменился основной запрос
query.subscribe(() => {
  cachedResponses.set({});
});
