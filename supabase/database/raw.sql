
DROP SEQUENCE IF EXISTS public.product_groups_id_seq;
CREATE SEQUENCE public.product_groups_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

DROP SEQUENCE IF EXISTS public.product_reviews_id_seq;
CREATE SEQUENCE public.product_reviews_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

DROP SEQUENCE IF EXISTS public.product_tags_id_seq;
CREATE SEQUENCE public.product_tags_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

DROP SEQUENCE IF EXISTS public.product_tags_id_seq1;
CREATE SEQUENCE public.product_tags_id_seq1
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

DROP SEQUENCE IF EXISTS public.product_variants_discounts_id_seq;
CREATE SEQUENCE public.product_variants_discounts_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

DROP SEQUENCE IF EXISTS public.product_variants_id_seq;
CREATE SEQUENCE public.product_variants_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;

DROP SEQUENCE IF EXISTS public.spec_fields_id_seq;
CREATE SEQUENCE public.spec_fields_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;-- public.discounts definition

DROP TABLE IF EXISTS public.discounts;
CREATE TABLE public.discounts (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	"type" public."discount_type" NOT NULL,
	value numeric NOT NULL,
	start_date timestamptz NULL,
	end_date timestamptz NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	qualifiers _text NULL DEFAULT '{}'::text[],
	CONSTRAINT discounts_pkey PRIMARY KEY (id)
);


-- public.product_brands definition



-- public.product_groups definition

DROP TABLE IF EXISTS public.product_groups;
CREATE TABLE public.product_groups (
	id int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE),
	"name" text NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT product_groups_pkey PRIMARY KEY (id)
);


-- public.tags definition

DROP TABLE IF EXISTS public.tags;
CREATE TABLE public.tags (
	id int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE),
	"name" varchar NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT product_tags_pkey PRIMARY KEY (id)
);


-- public.categories definition



-- public.products definition

DROP TABLE IF EXISTS public.products;
CREATE TABLE public.products (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	description text NOT NULL DEFAULT ''::text,
	thumbnail text NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	brand_id int8 NULL,
	category_id int8 NOT NULL,
	price numeric NULL DEFAULT 0.00,
	deleted_at timestamptz NULL,
	categories _text NULL,
	specs jsonb NULL,
	product_group_id int8 NULL,
	CONSTRAINT products_name_key UNIQUE (name),
	CONSTRAINT products_pkey PRIMARY KEY (id),
	CONSTRAINT products_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.product_brands(id) ON DELETE CASCADE,
	CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id),
	CONSTRAINT products_product_group_id_fkey FOREIGN KEY (product_group_id) REFERENCES public.product_groups(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Table Triggers

create trigger trg_after_create_product_update_product_categories after
insert
    on
    public.products for each row execute function fn_after_create_product_update_product_categories();


-- public.spec_fields definition

DROP TABLE IF EXISTS public.spec_fields;
CREATE TABLE public.spec_fields (
	id int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE),
	"name" text NOT NULL,
	category_id int8 NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT spec_fields_pkey PRIMARY KEY (id),
	CONSTRAINT spec_fields_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public.product_specs definition

DROP TABLE IF EXISTS public.product_specs;
CREATE TABLE public.product_specs (
	product_id uuid NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	spec_id int8 NOT NULL,
	value text NULL,
	CONSTRAINT product_specs_pkey PRIMARY KEY (product_id, spec_id),
	CONSTRAINT product_specs_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT product_specs_spec_id_fkey FOREIGN KEY (spec_id) REFERENCES public.spec_fields(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table Triggers

create trigger trg_after_upsert_product_specs_update_product_specs_column after
insert
    or
update
    on
    public.product_specs for each row execute function fn_after_upsert_product_specs_update_product_specs_column();
create trigger trg_after_delete_product_specs_update_product_specs_column after
delete
    on
    public.product_specs for each row execute function fn_after_delete_product_specs_update_product_specs_column();


-- public.product_tags definition

DROP TABLE IF EXISTS public.product_tags;
CREATE TABLE public.product_tags (
	id int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE),
	product_id uuid NOT NULL,
	tag_id int8 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT product_tags_pkey1 PRIMARY KEY (id),
	CONSTRAINT product_tags_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE,
	CONSTRAINT product_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE
);


-- public.product_variants definition

DROP TABLE IF EXISTS public.product_variants;
CREATE TABLE public.product_variants (
	id int8 NOT NULL GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE),
	product_id uuid NOT NULL,
	image_urls _text NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	price numeric NOT NULL DEFAULT 0.00,
	deleted_at timestamptz NULL,
	specs jsonb NULL DEFAULT '{}'::jsonb,
	CONSTRAINT product_variants_pkey PRIMARY KEY (id),
	CONSTRAINT product_variants_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE
);
CREATE INDEX idx_product_id_on_product_variants ON public.product_variants USING btree (product_id);


-- public.product_variants_discounts definition

DROP TABLE IF EXISTS public.product_variants_discounts;
CREATE TABLE public.product_variants_discounts (
	id int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE),
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	discount_id uuid NOT NULL,
	product_variant_id int8 NOT NULL,
	CONSTRAINT product_variants_discounts_pkey PRIMARY KEY (id),
	CONSTRAINT product_variants_discounts_discount_id_fkey FOREIGN KEY (discount_id) REFERENCES public.discounts(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT product_variants_discounts_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES public.product_variants(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX idx_discount_id_on_product_variants_discounts ON public.product_variants_discounts USING btree (discount_id);
CREATE INDEX idx_product_variant_id_on_product_variants_discounts ON public.product_variants_discounts USING btree (product_variant_id);


-- public.variant_specs definition

DROP TABLE IF EXISTS public.variant_specs;
CREATE TABLE public.variant_specs (
	variant_id int8 NOT NULL,
	spec_id int8 NOT NULL,
	value text NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT variation_specs_pkey PRIMARY KEY (variant_id, spec_id),
	CONSTRAINT variation_specs_spec_id_fkey FOREIGN KEY (spec_id) REFERENCES public.spec_fields(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT variation_specs_variation_id_fkey FOREIGN KEY (variant_id) REFERENCES public.product_variants(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- public.inventory definition



-- public.cart_items definition



-- public.carts definition



-- public.customer_addresses definition



-- public.customers definition

DROP TABLE IF EXISTS public.customers;
CREATE TABLE public.customers (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	profile_id uuid NOT NULL,
	first_name varchar NULL DEFAULT '""'::character varying,
	last_name varchar NULL DEFAULT '""'::character varying,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	CONSTRAINT customers_pkey PRIMARY KEY (id)
);

-- Table Triggers

create trigger trg_after_create_customer_create_cart after
insert
    on
    public.customers for each row execute function fn_after_create_customer_create_cart();


-- public.order_items definition



-- public.orders definition

DROP TABLE IF EXISTS public.orders;
CREATE TABLE public.orders (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	customer_id uuid NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT orders_pkey PRIMARY KEY (id)
);

-- Table Triggers

create trigger check_product_variant_stock_trigger before
insert
    on
    public.orders for each row execute function fn_check_product_variant_stock_before_order();


-- public.orders_discounts definition



-- public.product_reviews definition

DROP TABLE IF EXISTS public.product_reviews;
CREATE TABLE public.product_reviews (
	id int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE),
	message text NOT NULL DEFAULT ''::text,
	rating int2 NOT NULL,
	customer_id uuid NOT NULL,
	product_variant_id int8 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	CONSTRAINT product_reviews_pkey PRIMARY KEY (id)
);
CREATE INDEX idx_product_variant_id_on_product_reviews ON public.product_reviews USING btree (product_variant_id);


-- public.profiles definition

DROP TABLE IF EXISTS public.profiles;
CREATE TABLE public.profiles (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	user_id uuid NOT NULL,
	email text NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	"role" text NOT NULL DEFAULT 'user'::text,
	CONSTRAINT profiles_pkey PRIMARY KEY (id)
);


-- public.cart_items foreign keys

ALTER TABLE public.cart_items ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE CASCADE;
ALTER TABLE public.cart_items ADD CONSTRAINT cart_items_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES public.product_variants(id) ON DELETE CASCADE;


-- public.carts foreign keys

ALTER TABLE public.carts ADD CONSTRAINT carts_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE CASCADE;


-- public.customer_addresses foreign keys

ALTER TABLE public.customer_addresses ADD CONSTRAINT customer_addresses_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE CASCADE;


-- public.customers foreign keys

ALTER TABLE public.customers ADD CONSTRAINT customers_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE ON UPDATE CASCADE;


-- public.order_items foreign keys

ALTER TABLE public.order_items ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;
ALTER TABLE public.order_items ADD CONSTRAINT order_items_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES public.product_variants(id) ON DELETE CASCADE;


-- public.orders foreign keys

ALTER TABLE public.orders ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE CASCADE;


-- public.orders_discounts foreign keys

ALTER TABLE public.orders_discounts ADD CONSTRAINT orders_discounts_discount_id_fkey FOREIGN KEY (discount_id) REFERENCES public.discounts(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE public.orders_discounts ADD CONSTRAINT orders_discounts_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE ON UPDATE CASCADE;


-- public.product_reviews foreign keys

ALTER TABLE public.product_reviews ADD CONSTRAINT product_reviews_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE public.product_reviews ADD CONSTRAINT product_reviews_product_variant_id_fkey FOREIGN KEY (product_variant_id) REFERENCES public.product_variants(id) ON DELETE CASCADE ON UPDATE CASCADE;


-- public.profiles foreign keys

ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE ON UPDATE CASCADE;



DROP FUNCTION IF EXISTS public.fn_after_create_customer_create_cart();
CREATE OR REPLACE FUNCTION public.fn_after_create_customer_create_cart()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  INSERT INTO public.carts (customer_id, created_at, updated_at) VALUES (NEW.id, now(), now());
  RETURN NEW;
END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_after_create_product_update_product_categories();
CREATE OR REPLACE FUNCTION public.fn_after_create_product_update_product_categories()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
	update products
	set categories = fn_get_product_categories(new.id)
	where id = new.id;
	
	return new;
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_after_create_user();
CREATE OR REPLACE FUNCTION public.fn_after_create_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare v_profile_id uuid;
begin
	update auth.users
	set raw_user_meta_data = '{"role": "user"}'::jsonb
	where id = new.id;

	insert into public.profiles(user_id, email, role)
	values (new.id, new.email, 'user')
	returning id into v_profile_id;

	insert into public.customers(profile_id)
	values(v_profile_id);

	return new;
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_after_create_user_create_profile();
CREATE OR REPLACE FUNCTION public.fn_after_create_user_create_profile()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  INSERT INTO public.profiles (user_id, email, created_at, updated_at) VALUES (NEW.id, new.email, now(), now());
  RETURN NEW;
END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_after_delete_product_specs_update_product_specs_column();
CREATE OR REPLACE FUNCTION public.fn_after_delete_product_specs_update_product_specs_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
	update products
	set specs = fn_get_product_specs(old.product_id)
	where id = old.product_id;

	return new;	
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_after_update_user_update_profile();
CREATE OR REPLACE FUNCTION public.fn_after_update_user_update_profile()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
	update public.profiles
	set email = new.email,
		role = new.raw_user_meta_data ->> 'role'
	where user_id = new.id;

	return new;
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_after_upsert_product_specs_update_product_specs_column();
CREATE OR REPLACE FUNCTION public.fn_after_upsert_product_specs_update_product_specs_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
	
	update products
	set specs = fn_get_product_specs(new.product_id)
	where id = new.product_id;

	return new;
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_category_leafs();
CREATE OR REPLACE FUNCTION public.fn_category_leafs()
 RETURNS TABLE(id bigint, name text, parent_id bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
	SELECT c1.id, c1.name, c1.parent_id
	FROM categories c1
	WHERE NOT EXISTS (
	    SELECT 1
	    FROM categories c2
	    WHERE c1.id = c2.parent_id
	);
END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_check_product_variant_stock_before_order();
CREATE OR REPLACE FUNCTION public.fn_check_product_variant_stock_before_order()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.quantity > (SELECT stock_quantity FROM inventory WHERE product_variant_id = NEW.product_variant_id) THEN
    RAISE EXCEPTION 'Insufficient stock for product variant %', NEW.product_variant_id;
  END IF;
  RETURN NEW;
END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_create_categories(_text);
CREATE OR REPLACE FUNCTION public.fn_create_categories(p_category_names text[])
 RETURNS bigint
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_cat_name text;
  v_parent_id bigint;
  v_current_cat_id bigint;
BEGIN
  v_parent_id := NULL;
  
  FOREACH v_cat_name IN ARRAY p_category_names
  loop
	v_current_cat_id := null;
	raise notice 'parent_id = %', v_parent_id;
	
	select id into v_current_cat_id
	from categories
	where name = v_cat_name
	and parent_id IS NOT DISTINCT FROM v_parent_id;
	
	if v_current_cat_id is null then
		insert into categories (name, parent_id) 
	   	values (v_cat_name, v_parent_id)
	   	returning id into v_parent_id;
    else
		v_parent_id := v_current_cat_id;
    end if;
  END LOOP;
  
  RETURN v_parent_id;
END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_create_category(text, int8);
CREATE OR REPLACE FUNCTION public.fn_create_category(p_name text, p_parent_id bigint)
 RETURNS bigint
 LANGUAGE plpgsql
AS $function$
declare 
  v_category_id bigint;
  v_parent_id bigint;
begin
  if (p_parent_id is not null AND exists(select 1 from categories where id = p_parent_id)) OR p_parent_id is null then
    insert into categories (name, parent_id)
    values (p_name, p_parent_id)
    returning id into v_category_id;
  end if;
  return v_category_id;

end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_create_product(text, text, numeric, text, text, text, text, jsonb, _text);
CREATE OR REPLACE FUNCTION public.fn_create_product(p_name text, p_description text, p_price numeric, p_thumbnail text, p_brand text, p_category text, p_parent_category text, p_specs jsonb, p_tags text[])
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_brand_id bigint;
  v_category_id bigint;
  v_new_product_id uuid;
  v_error_context text;
  v_error_msg text;
BEGIN
  SELECT fn_find_or_create_brand(p_brand) INTO v_brand_id;
  SELECT fn_find_or_create_category(p_category, p_parent_category) into v_category_id;

  INSERT INTO public.products (
    name,
    price,
    description,
    thumbnail,
    brand_id,
    category_id
  ) VALUES (
    p_name,
    p_price,
    p_description,
    p_thumbnail,
    v_brand_id,
    v_category_id
  )
  RETURNING id INTO v_new_product_id;

  	if p_tags is not null then
	 	PERFORM fn_create_product_tags(v_new_product_id, p_tags);
  	end if;
  	
  	if p_specs is not null then
  		perform fn_create_product_specs(v_new_product_id, p_specs);
	end if;

  RETURN v_new_product_id;

EXCEPTION
  WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_error_context = PG_EXCEPTION_CONTEXT,
                             v_error_msg = MESSAGE_TEXT;
    RAISE EXCEPTION 'Error: %, Context: %', v_error_msg, v_error_context;
END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_create_product_categories(uuid, int8);
CREATE OR REPLACE FUNCTION public.fn_create_product_categories(p_product_id uuid, p_category_id bigint)
 RETURNS bigint
 LANGUAGE plpgsql
AS $function$
declare
	v_category_id bigint;
begin
	insert into product_categories (product_id, category_id)
	values (p_product_id, p_category_id)
	returning * into v_category_id;

	return v_category_id;
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_create_product_specs(uuid, jsonb);
CREATE OR REPLACE FUNCTION public.fn_create_product_specs(p_product_id uuid, specs jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
declare 
	v_key text;
	v_value text;
	v_spec_id bigint;
begin
	FOR v_key, v_value IN SELECT * FROM jsonb_each(specs) loop
		select id into v_spec_id 
		from spec_fields 
		where name = v_key;
		
		if v_spec_id is null then
			insert into spec_fields (name)
			values (v_key)
			returning id into v_spec_id;
		end if;
	
		raise notice 'value: %', v_value;
	
		if (select substring(v_value from 1 for 1) = '"') then
			v_value := substring(v_value from 1 for char_length(v_value));
		end if;

		if (select substring(v_value from char_length(v_value) - 1 for 1) = '"') then
			v_value := substring(v_value from 1 for char_length(v_value) - 1);
		end if;
	
		insert into product_specs (product_id, spec_id, value)
		values (
			p_product_id, 
			v_spec_id, 
			substring(v_value from 2 for char_length(v_value) - 2)
		);
	
	end loop;
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_create_product_tags(uuid, _text);
CREATE OR REPLACE FUNCTION public.fn_create_product_tags(p_product_id uuid, p_tags text[])
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    d_tag_id bigint;
    d_tag_name text;
BEGIN
    FOREACH d_tag_name IN ARRAY p_tags
    LOOP
        d_tag_id := fn_find_or_create_tag(d_tag_name);
        INSERT INTO public.product_tags (product_id, tag_id, created_at, updated_at) VALUES (p_product_id, d_tag_id, now(), now());
    END LOOP;
END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_create_product_variant(uuid, numeric, _text, jsonb);
CREATE OR REPLACE FUNCTION public.fn_create_product_variant(p_product_id uuid, p_price numeric, p_image_urls text[], p_specs jsonb)
 RETURNS bigint
 LANGUAGE plpgsql
AS $function$
declare v_variant_id bigint;
begin
	insert into product_variants (product_id, price, image_urls)
	values (p_product_id, p_price, p_image_urls)
	returning id into v_variant_id;

	perform fn_create_product_variant_specs(v_variant_id, p_specs);

	return v_variant_id;
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_create_product_variant(uuid, numeric, int4, _text, json);
CREATE OR REPLACE FUNCTION public.fn_create_product_variant(p_product_id uuid, p_price_offset numeric, p_stock_quantity integer, p_image_urls text[], p_attributes json)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_new_variant_id bigint;
  v_key text;
  v_value text;
  v_attribute_id bigint;
  v_product_attribute_id bigint;
BEGIN

  insert into product_variants (product_id, image_urls, price_offset)
  values (p_product_id, p_image_urls, p_price_offset)
  returning id into v_new_variant_id;

  insert into inventory (product_variant_id, stock_quantity)
  values (v_new_variant_id, p_stock_quantity);

-- Loop through each key-value pair in p_attributes JSON
  FOR v_key, v_value IN SELECT * FROM json_each_text(p_attributes)
  LOOP
    -- Find or create 'attributes' row for each key-value pair
    select a.id into v_attribute_id from attributes a
    join product_attributes pa on pa.attribute_id = a.id
    where a.name = v_key;

    if v_attribute_id is null then
	  raise exception 'Invalid product attribute';
    end if;

    -- Create new 'product_attributes' row linking the attribute to the product variant
    select id into v_product_attribute_id from product_attributes where attribute_id = v_attribute_id;

    if v_product_attribute_id is null then
      INSERT INTO product_attributes (product_id, attribute_id)
      VALUES (p_product_id, v_attribute_id)
      ON CONFLICT (product_id, attribute_id) DO NOTHING
      RETURNING id INTO v_product_attribute_id;
    end if;

    INSERT INTO product_variant_attributes (value, product_variant_id, product_attribute_id)
    VALUES (v_value, v_new_variant_id, v_product_attribute_id);

  END LOOP;
END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_create_product_variant_specs(int8, jsonb);
CREATE OR REPLACE FUNCTION public.fn_create_product_variant_specs(p_variant_id bigint, p_specs jsonb)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
declare
	v_spec_field_id bigint;
	v_variant_spec_id bigint;
	v_key text;
	v_value text;
begin
	FOR v_key, v_value IN SELECT * FROM jsonb_each(p_specs) loop
		select id into v_spec_field_id 
		from public.spec_fields 
		where name = v_key;
	
		if v_spec_field_id is null then
			insert into public.spec_fields(name) values(v_key) returning id into v_spec_field_id;
		end if;
	
		insert into variant_specs (variant_id, spec_id, value)
		values (p_variant_id, v_spec_field_id, v_value);
	end loop;
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_find_or_create_brand(text);
CREATE OR REPLACE FUNCTION public.fn_find_or_create_brand(p_name text)
 RETURNS bigint
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_brand_id bigint;
BEGIN
  -- Check if the brand already exists
  SELECT id INTO v_brand_id FROM public.product_brands WHERE name = p_name;

  -- If it doesn't exist, create a new one
  IF v_brand_id IS NULL THEN
    INSERT INTO public.product_brands(name) VALUES (p_name) RETURNING id INTO v_brand_id;
  END IF;

  -- Return the brand ID
  RETURN v_brand_id;
END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_find_or_create_category(text, int8);
CREATE OR REPLACE FUNCTION public.fn_find_or_create_category(p_cat_name text, p_parent_id bigint)
 RETURNS bigint
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_category_id bigint;
begin
	if p_parent_id = 0 then
		p_parent_id := null;
	end if;

  select id into v_category_id from categories where name = p_cat_name and parent_id is not distinct from p_parent_id;
  if v_category_id is null then
  	insert into categories (name, parent_id) values (p_cat_name, p_parent_id) returning id into v_category_id;	
  end if;

  RETURN v_category_id;
 END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_find_or_create_category(text, text);
CREATE OR REPLACE FUNCTION public.fn_find_or_create_category(p_cat_name text, p_parent_name text)
 RETURNS bigint
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_category_id bigint;
  v_parent_id bigint;
begin
  v_parent_id := null;
  if p_parent_name is not null then
  	select id into v_parent_id from categories where name = p_parent_name;
  end if;
  
  select id into v_category_id from categories where name = p_cat_name and parent_id is not distinct from v_parent_id;
  if v_category_id is null then
  	insert into categories (name, parent_id) values (p_cat_name, v_parent_id) returning id into v_category_id;	
  end if;

  RETURN v_category_id;
 END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_find_or_create_tag(text);
CREATE OR REPLACE FUNCTION public.fn_find_or_create_tag(p_tag_name text)
 RETURNS bigint
 LANGUAGE plpgsql
AS $function$
DECLARE
    d_tag_id bigint;
BEGIN
    SELECT id INTO d_tag_id FROM public.tags WHERE name = p_tag_name;
    IF d_tag_id IS NULL THEN
        INSERT INTO public.tags (name, created_at, updated_at) VALUES (p_tag_name, now(), now()) RETURNING id INTO d_tag_id;
    END IF;
    RETURN d_tag_id;
END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_get_category_chain(uuid);
CREATE OR REPLACE FUNCTION public.fn_get_category_chain(p_product_id uuid)
 RETURNS text[]
 LANGUAGE plpgsql
AS $function$
DECLARE
  d_category_id bigint;
  d_category_name text;
  d_chain text[];
BEGIN
  -- Get the category_id for the given product
  select category_id into d_category_id from products where p_product_id = id;

  -- Initialize the chain as an empty string
  d_chain := ARRAY[]::text[];
  
  -- Loop to build the category chain
  WHILE d_category_id IS NOT NULL LOOP
    SELECT name, parent_id INTO d_category_name, d_category_id FROM product_categories WHERE id = d_category_id;
    
    -- Add the category name to the array
    d_chain := array_prepend(d_category_name, d_chain);

  END LOOP;
  
  RETURN d_chain;
END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_get_category_tree();
CREATE OR REPLACE FUNCTION public.fn_get_category_tree()
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
  result jsonb;
BEGIN
  SELECT
    jsonb_agg(jsonb_build_object(
      'id', c.id,
      'name', c.name,
      'children', COALESCE(fn_get_child_categories(c.id), '[]'::jsonb)
    ))
  INTO
    result
  FROM
    public.categories c
  WHERE
    c.parent_id IS NULL;

  RETURN result;
END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_get_child_categories(int8);
CREATE OR REPLACE FUNCTION public.fn_get_child_categories(p_parent_id bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
  child_result jsonb;
BEGIN
  SELECT
    jsonb_agg(jsonb_build_object(
      'id', c.id,
      'name', c.name,
      'children', COALESCE(fn_get_child_categories(c.id), '[]'::jsonb)
    ))
  INTO
    child_result
  FROM
    public.categories c
  WHERE
    c.parent_id = p_parent_id;

  RETURN COALESCE(child_result, '[]'::jsonb);
END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_get_product_categories(uuid);
CREATE OR REPLACE FUNCTION public.fn_get_product_categories(p_product_id uuid)
 RETURNS text[]
 LANGUAGE plpgsql
AS $function$
declare 
	v_category_hierarchy text[];
	v_category_name text;
	v_parent_id bigint;
begin
	select category_id into v_parent_id from products where id = p_product_id;

	while v_parent_id is not null loop
		v_category_name := null;
		
		select name, parent_id 
		into v_category_name, v_parent_id 
		from categories 
		where id = v_parent_id;
	
		v_category_hierarchy := v_category_name || v_category_hierarchy;
		
	end loop;
	
	return v_category_hierarchy;
	
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_get_product_product_variants_ids(uuid);
CREATE OR REPLACE FUNCTION public.fn_get_product_product_variants_ids(p_product_id uuid)
 RETURNS text[]
 LANGUAGE plpgsql
AS $function$
declare v_variant_ids text[];
begin
	select array_agg(pv.id)
	into v_variant_ids
	from products p
	join product_variants pv on p.id = pv.product_id
	group by (p.id);
		
	return v_variant_ids;
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_get_product_specs(uuid);
CREATE OR REPLACE FUNCTION public.fn_get_product_specs(p_product_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_result jsonb := '{}'::jsonb;
  v_row record;
  v_key text;
BEGIN
  FOR v_row IN (SELECT * FROM product_specs WHERE product_id = p_product_id)
  LOOP
  raise notice '%', v_row.spec_id;

	SELECT name INTO v_key FROM spec_fields WHERE id = v_row.spec_id;
  	v_result := v_result || jsonb_build_object(v_key, v_row.value); 
   end loop;
  
  return v_result;
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_get_product_variant_rating(int8);
CREATE OR REPLACE FUNCTION public.fn_get_product_variant_rating(p_variant_id bigint)
 RETURNS numeric
 LANGUAGE plpgsql
AS $function$
declare v_rating numeric;
begin
	select round(coalesce(avg(pr.rating), 0)::numeric, 2)
	into v_rating
	from product_reviews pr
	join product_variants pv on pr.product_variant_id = pv.id
	join products p on p.id = pv.product_id
	where pv.id = p_variant_id;
	
	return v_rating;
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_get_product_variant_specs(int8);
CREATE OR REPLACE FUNCTION public.fn_get_product_variant_specs(p_variant_id bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$
DECLARE
  v_result jsonb := '{}'::jsonb;
  v_row record;
  v_key text;
BEGIN
  FOR v_row IN (SELECT * FROM variant_specs WHERE variant_id = p_variant_id)
  LOOP

	SELECT name INTO v_key FROM spec_fields WHERE id = v_row.spec_id;
  	v_result := v_result || jsonb_build_object(v_key, v_row.value); 
  
  end loop;
  
  return v_result;
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_get_to_many_foreign_tables_array(text);
CREATE OR REPLACE FUNCTION public.fn_get_to_many_foreign_tables_array(p_table_name text)
 RETURNS text[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_result text[];
begin
	SELECT array_agg(ccu.table_name)
	into v_result
	FROM information_schema.table_constraints AS tc 
	JOIN information_schema.key_column_usage AS kcu
	    ON kcu.constraint_name = tc.constraint_name
	JOIN information_schema.constraint_column_usage AS ccu
	    ON ccu.constraint_name = tc.constraint_name
	WHERE tc.constraint_type = 'FOREIGN KEY' 
	AND tc.table_schema = 'public'
	AND tc.table_name = p_table_name;

    RETURN v_result;
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_get_to_one_foreign_tables_array(text);
CREATE OR REPLACE FUNCTION public.fn_get_to_one_foreign_tables_array(p_table_name text)
 RETURNS text[]
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_result text[];
BEGIN
	SELECT array_agg(tc.table_name)
	into v_result
	FROM information_schema.table_constraints AS tc 
	JOIN information_schema.key_column_usage AS kcu
	    ON kcu.constraint_name = tc.constraint_name
	JOIN information_schema.constraint_column_usage AS ccu
	    ON ccu.constraint_name = tc.constraint_name
	WHERE tc.constraint_type = 'FOREIGN KEY' 
	AND tc.table_schema = 'public'
	AND ccu.table_name = p_table_name;

    RETURN v_result;
END;
$function$
;

DROP FUNCTION IF EXISTS public.fn_is_admin();
CREATE OR REPLACE FUNCTION public.fn_is_admin()
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
   BEGIN
     RETURN (
       SELECT EXISTS(
         SELECT 1 FROM public.admins WHERE user_id = auth.uid()
       )
     );
   END;
   $function$
;

DROP FUNCTION IF EXISTS public.fn_is_product_discounted(uuid);
CREATE OR REPLACE FUNCTION public.fn_is_product_discounted(p_product_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
declare v_discount_id uuid;
begin
	select d.id
	into v_discount_id
	from discounts d
	join product_variants_discounts pvd on pvd.discount_id = d.id
	join product_variants pv on pv.id = pvd.product_variant_id 
	join products p on p.id = pv.product_id
	where p.id = p_product_id;

	if v_discount_id is not null then
		return true;
	else
		return false;
	end if;
end;
$function$
;

DROP FUNCTION IF EXISTS public.fn_update_variant_specs_column();
CREATE OR REPLACE FUNCTION public.fn_update_variant_specs_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
	
	update product_variants
	set specs = fn_get_product_variant_specs(new.variant_id)
	where id = new.variant_id;

	return new;
end;
$function$
;