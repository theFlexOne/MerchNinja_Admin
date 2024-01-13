CREATE TRIGGER 
	TRG_CHECK_VALID_PRODUCT_ATTRIBUTE before
	INSERT
	    ON public.products_attributes FOR each row
	execute
	    function fn_trg_check_valid_product_attribute ()
; 

CREATE TRIGGER 
	TRG_AFTER_CREATE_CUSTOMER_CREATE_CART after
	INSERT
	    ON public.customers FOR each row
	execute
	    function fn_after_create_customer_create_cart ()
; 

create trigger 
	trg_validate_product_before_publish before
	update
	    of status on public.products for each row
	    when ( (new.status = 'PUBLISHED':: text)
	    )
	execute
	    function fn_trg_validate_product_before_publish ()
; 