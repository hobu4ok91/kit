import type { Product } from './product'

export interface SearchProductsResult {
  products: Product[]
  hasMoreProducts: boolean
}
