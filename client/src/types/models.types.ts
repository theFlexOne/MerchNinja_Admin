import { Database, Tables } from './database.types';

export type FullProduct = Tables<'products'>;
export type FullBrand = Tables<'brands'>;
export type FullCategory = Tables<'categories'>;
export type FullSubcategory = Tables<'subcategories'>;
export type FullProductVariantAttribute = Tables<'product_variant_attributes'>;
export type FullCustomer = Tables<'customers'>;
export type FullCustomerAddress = Tables<'customer_addresses'>;
export type FullCustomerProfile = Tables<'customer_profiles'>;
export type FullOrder = Tables<'orders'>;
export type FullInventory = Tables<'inventory'>;
export type FullOrderItem = Tables<'order_items'>;
export type FullStatusType = Tables<'product_status_types'>;

export type FullUSState = Tables<'us_states'>;
export type FullCountryCode = Tables<'country_codes'>;

export type StripMetadata<T> = Omit<
  T,
  'created_at' | 'updated_at' | 'deleted_at'
>;

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  status: Database['public']['Tables']['product_status_types']['Row']['label'];
  created_at: string;
  updated_at: string;
  brand: Brand;
  subcategory: Subcategory;
  attributes: string[];
  tags: string[];
};

export type Brand = StripMetadata<FullBrand>;
export type Category = StripMetadata<FullCategory>;
export type Subcategory = StripMetadata<FullSubcategory>;
export type USState = StripMetadata<FullUSState>;
export type CountryCode = StripMetadata<FullCountryCode>;
export type Customer = StripMetadata<FullCustomer>;
export type CustomerAddress = StripMetadata<FullCustomerAddress>;
export type CustomerProfile = StripMetadata<FullCustomerProfile>;
export type Order = StripMetadata<FullOrder>;
export type Inventory = StripMetadata<FullInventory>;
export type OrderItem = StripMetadata<FullOrderItem>;
