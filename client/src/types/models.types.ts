export type FullProduct = Tables<'products'>;
export type FullBrand = Tables<'brands'>;
export type FullCategory = Tables<'categories'>;
export type FullSubcategory = Tables<'subcategories'>;
export type FullAttribute = Tables<'attribute_fields'>;
export type FullProductAttribute = Tables<'products_attributes'>;
export type FullProductVariantAttribute = Tables<'product_variant_attributes'>;
export type FullSpecField = Tables<'spec_fields'>;
export type FullProductSpec = Tables<'products_specs'>;
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

export type Product = StripMetadata<FullProduct> & {
  brand: Brand;
  category: Category;
  subcategory: Subcategory;
  attributes: ProductAttribute[];
};
export type Brand = StripMetadata<FullBrand>;
export type Category = StripMetadata<FullCategory>;
export type Subcategory = StripMetadata<FullSubcategory>;
export type Attribute = StripMetadata<FullAttribute>;
export type ProductAttribute = StripMetadata<FullProductAttribute>;
export type SpecField = StripMetadata<FullSpecField>;
export type ProductSpec = StripMetadata<FullProductSpec>;
export type USState = StripMetadata<FullUSState>;
export type CountryCode = StripMetadata<FullCountryCode>;
export type Customer = StripMetadata<FullCustomer>;
export type CustomerAddress = StripMetadata<FullCustomerAddress>;
export type CustomerProfile = StripMetadata<FullCustomerProfile>;
export type Order = StripMetadata<FullOrder>;
export type Inventory = StripMetadata<FullInventory>;
export type OrderItem = StripMetadata<FullOrderItem>;
