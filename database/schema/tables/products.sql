DROP TABLE IF EXISTS public.products;

CREATE TABLE
    public.products (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" text NULL,
        description text NULL DEFAULT '':: text,
        thumbnail text NULL,
        base_price numeric NULL DEFAULT 0.00,
        brand_id int8 NULL,
        subcategory_id int8 NULL,
        status text NOT NULL DEFAULT 'DRAFT':: text,
        metadata jsonb NOT NULL DEFAULT '{}':: jsonb,
        -------------------------------------
        CONSTRAINT products_pkey PRIMARY KEY (id),
        CONSTRAINT products_name_key UNIQUE (name),
    ) INHERITS (utility.TABLE_BASE);

CREATE POLICY
    products_read_all_policy ON public.products FOR
SELECT USING (true);

create trigger 
	trg_validate_product_before_publish before
	update
	    of status on public.products for each row
	    when ( (new.status = 'PUBLISHED':: text)
	    )
	execute
	    function fn_trg_validate_product_before_publish ()
; 