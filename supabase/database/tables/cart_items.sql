DROP TABLE IF EXISTS public.cart_items;
CREATE TABLE public.cart_items (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE),
	cart_id int8 NOT NULL,
	product_variant_id int8 NOT NULL,
	quantity int4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT cart_items_pkey PRIMARY KEY (id)
);

DROP SEQUENCE IF EXISTS public.cart_items_id_seq;
CREATE SEQUENCE public.cart_items_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
