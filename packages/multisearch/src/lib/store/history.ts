import type { Writable } from "svelte/store";
import { writable } from "svelte/store";
import { clear, getFromStorage, putToStorage } from "../core/local-storage";

export const history: Writable<string[]> = writable(getFromStorage());

export const addToHistory = (query: string) => {
  const trimmed = query.trim();

  history.update((queries) => {
    const unique = Array.from(new Set([trimmed, ...queries]));
    const filtered = unique.slice(0, 7);

    putToStorage(filtered);

    return filtered;
  });
};

export function clearHistory() {
  history.set([]);
  clear();
}
