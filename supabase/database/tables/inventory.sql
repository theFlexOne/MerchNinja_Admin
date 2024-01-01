DROP TABLE IF EXISTS public.inventory;
CREATE TABLE public.inventory (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE),
	product_variant_id int8 NOT NULL,
	stock_quantity int4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT inventory_pkey PRIMARY KEY (id),
	CONSTRAINT inventory_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES public.product_variants(id) ON DELETE CASCADE
);

DROP SEQUENCE IF EXISTS public.inventory_id_seq;
CREATE SEQUENCE public.inventory_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
