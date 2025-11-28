export type Product = {
  categoryId: string;
  id: string;
  isVegetarian: boolean;
  name: string;
  notes: string;
  price: number;
};

export type Products = {
  products: Product[];
  total: number;
};
