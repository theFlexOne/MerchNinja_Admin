CREATE POLICY
    products_read_all_policy ON public.products FOR
SELECT USING (true);

CREATE POLICY
    product_variants_read_all_policy ON public.product_variants FOR
SELECT USING (true);

CREATE POLICY
    attribute_fields_read_all_policy ON public.attribute_fields FOR
SELECT USING (true);

CREATE POLICY
    products_attributes_read_all_policy ON public.products_attributes FOR
SELECT USING (true);

CREATE POLICY
    product_variant_attributes_read_all_policy ON public.product_variant_attributes FOR
SELECT USING (true);

CREATE POLICY
    brands_read_all_policy ON public.brands FOR
SELECT USING (true);

CREATE POLICY
    tags_read_all_policy ON public.tags FOR
SELECT USING (true);

CREATE POLICY
    categories_read_all_policy ON public.categories FOR
SELECT USING (true);

CREATE POLICY
    spec_fields_read_all_policy ON public.spec_fields FOR
SELECT USING (true);

CREATE POLICY
    product_reviews_read_all_policy ON public.product_reviews FOR
SELECT USING (true);

CREATE POLICY
    product_tags_read_all_policy ON public.product_tags FOR
SELECT USING (true);

CREATE POLICY
    products_specs_read_all_policy ON public.products_specs FOR
SELECT USING (true);