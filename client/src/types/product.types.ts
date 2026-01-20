export interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  isFavorite: boolean;
  sales: number;
}

export interface NavItem {
  name: string;
  path: string;
}
