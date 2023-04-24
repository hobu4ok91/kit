import type { Readable } from "svelte/store";
import { derived } from "svelte/store";
import { createSearchUrl } from "../components/search/search";
import type { Category } from "../types/category";
import type { Suggestion } from "../types/suggestion";
import { isPreventedLinks } from "./config";
import { query } from "./search";
import { currentItem, Entity, entity } from "./selectable";
import { SearchEvent, SelectCategoryEvent } from "../events";

export const submit: Readable<() => void> = derived(
  [query, entity, currentItem, isPreventedLinks],
  ([$query, $entity, $currentItem, $isPreventedLinks]) => {
    return (): void => {
      if (!$query && !$currentItem) {
        return;
      }

      if ($query && !$currentItem) {
        submitQuery($query, $isPreventedLinks);
      }

      if ($currentItem) {
        if ($entity === Entity.category) {
          submitCategory($currentItem as Category, $isPreventedLinks);
        }
        if ($entity === Entity.suggestion) {
          const { suggestion } = $currentItem as Suggestion;

          submitQuery(suggestion, $isPreventedLinks);
        }
        if ($entity === Entity.history) {
          submitQuery($currentItem as string, $isPreventedLinks);
        }
      }
    };
  }
);

function submitCategory(category: Category, isPrevent: boolean) {
  if (!isPrevent) {
    location.assign(category.url);
  }

  new SelectCategoryEvent().dispatch(category.url);
}

function submitQuery(query: string, isPrevent: boolean) {
  if (!isPrevent) {
    location.assign(createSearchUrl(query));
  }

  new SearchEvent().dispatch(query);
}
