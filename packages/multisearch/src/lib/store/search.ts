import type { Readable, Writable } from 'svelte/store'
import type { SearchResult } from '../types/search-result'
import { derived } from 'svelte/store'
import { writable } from 'svelte/store'

// search results
export const query = writable('')
export const searchResult: Writable<SearchResult | null> = writable(null)
export const hasServerError: Writable<boolean> = writable(false)

export const suggestionsWithDefault = derived(
  [searchResult, query],
  ([$result, $query]) => {
    if (!$result) {
      return []
    }

    const defaultSuggestion = {
      suggestion: $query,
      highlight: `<b>${$query}</b>`,
    }

    return [defaultSuggestion, ...$result.suggestions]
  },
)

export const isEmptyResult: Readable<boolean> = derived(
  [searchResult],
  ([$searchResult]) => {
    if (!$searchResult) {
      return false
    }

    const { suggestions, products, categories } = $searchResult

    return [suggestions, products, categories].every(
      (array) => array.length === 0,
    )
  },
)
