DROP TABLE IF EXISTS public.customer_addresses;
CREATE TABLE public.customer_addresses (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE),
	customer_id uuid NOT NULL,
	street text NOT NULL,
	street2 text NULL,
	city text NOT NULL,
	state text NOT NULL,
	zip text NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT customer_addresses_pkey PRIMARY KEY (id)
);

DROP SEQUENCE IF EXISTS public.customer_addresses_id_seq;
CREATE SEQUENCE public.customer_addresses_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
