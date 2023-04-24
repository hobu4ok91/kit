export interface Product {
  sku: string;
  name: string;
  costs: {
    cost: string;
    strikeCost: string | null;
  } | null;
  labels: ProductLabel[];
  count: number;
  img: string;
  url: string;
}

export interface ProductLabel {
  name: string;
  filename: string;
}
