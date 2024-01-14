CREATE POLICY
    products_read_all_policy ON public.products FOR
SELECT USING (true);

CREATE POLICY
    product_variants_read_all_policy ON public.product_variants FOR
SELECT USING (true);

CREATE POLICY
    product_variant_attributes_read_all_policy ON public.product_variant_attributes FOR
SELECT USING (true);

CREATE POLICY
    brands_read_all_policy ON public.brands FOR
SELECT USING (true);

CREATE POLICY
    categories_read_all_policy ON public.categories FOR
SELECT USING (true);

CREATE POLICY
    product_reviews_read_all_policy ON public.product_reviews FOR
SELECT USING (true);
