ALTER TABLE public.product_reviews ADD CONSTRAINT product_reviews_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.product_tags ADD CONSTRAINT product_tags_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products (id) ON DELETE CASCADE;

ALTER TABLE public.product_tags ADD CONSTRAINT product_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags (id) ON DELETE CASCADE;

ALTER TABLE public.products ADD CONSTRAINT products_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands (id) ON DELETE CASCADE;

ALTER TABLE public.products_specs ADD CONSTRAINT product_specs_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.products_specs ADD CONSTRAINT product_specs_spec_field_id_fkey FOREIGN KEY (spec_field_id) REFERENCES public.spec_fields (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.cart_items ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts (id) ON DELETE CASCADE;

ALTER TABLE public.carts ADD CONSTRAINT carts_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers (id) ON DELETE CASCADE;

ALTER TABLE public.customer_addresses ADD CONSTRAINT customer_addresses_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers (id) ON DELETE CASCADE;

ALTER TABLE public.customer_profiles ADD CONSTRAINT customer_profiles_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.customers ADD CONSTRAINT customers_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.order_items ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders (id) ON DELETE CASCADE;

ALTER TABLE public.orders ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers (id) ON DELETE CASCADE;

ALTER TABLE public.orders_discounts ADD CONSTRAINT orders_discounts_discount_id_fkey FOREIGN KEY (discount_id) REFERENCES public.discounts (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.orders_discounts ADD CONSTRAINT orders_discounts_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.subcategories ADD CONSTRAINT subcategories_categories_id_fk FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.products ADD CONSTRAINT products_subcategory_id_fkey FOREIGN KEY (subcategory_id) REFERENCES public.subcategories (id) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE public.products_attributes ADD CONSTRAINT products_attributes_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.products_attributes ADD CONSTRAINT products_attributes_attribute_field_id_fkey FOREIGN KEY (attribute_field_id) REFERENCES public.attribute_fields (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.product_variant_attributes ADD CONSTRAINT product_variant_attributes_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES public.product_variants (id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE public.product_variant_attributes ADD CONSTRAINT product_variant_attributes_product_attribute_id_fkey FOREIGN KEY (product_attribute_id) REFERENCES public.products_attributes (id) ON DELETE CASCADE ON UPDATE CASCADE;