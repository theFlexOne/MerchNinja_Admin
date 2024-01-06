ALTER TABLE
    public.product_groups
ADD
    CONSTRAINT attribute_ids_are_unique CHECK (
        fn_check_unique_elements_in_array(attribute_ids)
    );

ALTER TABLE
    public.product_groups
ADD
    CONSTRAINT attribute_ids_exist_in_attributes CHECK (
        fn_check_attribute_ids_exist(attribute_ids)
    );