import type { Category } from './category'
import type { Product } from './product'
import type { Suggestion } from './suggestion'

export interface SearchResult {
  categories: Category[]
  products: Product[]
  suggestions: Suggestion[]
  hasMoreProducts: boolean
  expression: string
}
