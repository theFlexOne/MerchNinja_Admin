CREATE TRIGGER 
	TRG_CHECK_VALID_PRODUCT_ATTRIBUTE before
	INSERT
	    ON public.products_attributes FOR each row
	execute
	    function fn_trg_check_valid_product_attribute ()
; 

CREATE TRIGGER 
	TRG_AFTER_CREATE_PRODUCT_UPDATE_PRODUCT_CATEGORIES after
	INSERT
	    ON public.products FOR each row
	execute
	    function fn_after_create_product_update_product_categories ()
; 

CREATE TRIGGER 
	TRG_AFTER_CREATE_CUSTOMER_CREATE_CART after
	INSERT
	    ON public.customers FOR each row
	execute
	    function fn_after_create_customer_create_cart ()
; 