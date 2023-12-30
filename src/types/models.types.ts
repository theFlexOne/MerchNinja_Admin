export type Category = {
  name: string;
  id: number;
};

export type Brand = {
  name: string;
  id: number;
};

export type ProductGroup = {
  name: string;
  id: number;
  attributes: ProductAttribute[];
};

export type ProductAttribute = {
  name: string;
  type: 'text' | 'number' | 'boolean';
  id: number;
};
