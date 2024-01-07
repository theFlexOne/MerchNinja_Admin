import { Tables } from './database.types';

export type Category = {
  name: string;
  id: number;
};

export type Brand = Tables<'product_brands'>;

export type ProductGroup = {
  name: string;
  id: number;
  attributes: ProductAttribute[];
};

export type ProductAttribute = {
  name: string;
  value: string;
  id?: number;
};
