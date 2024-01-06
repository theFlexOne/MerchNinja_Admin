CREATE TRIGGER TRG_CHECK_ATTRIBUTE_IDS_EXIST before
update of attribute_ids on public.product_groups for each row execute function fn_trg_check_attribute_ids_exist ();

CREATE TRIGGER TRG_CHECK_VALID_PRODUCT_ATTRIBUTE before insert on public.products_attributes for each row execute function fn_trg_check_valid_product_attribute ();

CREATE TRIGGER TRG_AFTER_CREATE_PRODUCT_UPDATE_PRODUCT_CATEGORIES after insert on public.products for each row execute function fn_after_create_product_update_product_categories ();

CREATE TRIGGER TRG_AFTER_CREATE_CUSTOMER_CREATE_CART after insert on public.customers for each row execute function fn_after_create_customer_create_cart ();