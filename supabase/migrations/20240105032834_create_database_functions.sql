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

CREATE OR REPLACE FUNCTION public.fn_check_attribute_ids_exist(p_attribute_ids bigint[])
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_attribute_id bigint;
BEGIN
    FOREACH v_attribute_id IN ARRAY p_attribute_ids
    LOOP
        IF NOT EXISTS (SELECT 1 FROM attributes a WHERE a.id = v_attribute_id) THEN
            RETURN false;
        END IF;
    END LOOP;
    RETURN true;
END; $function$
;

CREATE OR REPLACE FUNCTION public.fn_check_unique_elements_in_array(bigint_array bigint[])
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
    unique_count INTEGER;
    total_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO unique_count FROM (
        SELECT DISTINCT unnest(bigint_array)
    ) AS unique_elements;

    SELECT array_length(bigint_array, 1) INTO total_count;

    RETURN unique_count = total_count;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.fn_check_valid_product_attribute(p_attribute_id bigint, p_product_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
declare
	v_attribute_ids bigint[];
begin
	if p_product_id is null then return true; end if;
	
	select pg.attribute_ids 
	into v_attribute_ids 
	from products p
	left join product_groups pg on p.product_group_id = pg.id
	where p.id = p_product_id;
	
	if v_attribute_ids is null or p_attribute_id = any(v_attribute_ids) then
		return true;
	end if;

	return false;
end;
$function$
;

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

CREATE OR REPLACE FUNCTION public.fn_trg_check_attribute_ids_exist()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF NOT fn_check_attribute_ids_exist(NEW.attribute_ids) THEN
        RAISE EXCEPTION 'One or more attribute_ids do not exist in the attributes table';
    END IF;
    RETURN NEW;
END; $function$
;

CREATE OR REPLACE FUNCTION public.fn_trg_check_valid_product_attribute()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
	if not fn_check_valid_product_attribute(new.attribute_id, new.product_id) then
		RAISE EXCEPTION 'Invalid product attribute. The attribute_id: % does not belong to the product with product_id: %. Please ensure the attribute is valid for the specified product.', NEW.attribute_id, NEW.product_id;
    END IF;
   return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.fn_trg_remove_attribute_id()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE product_groups
    SET attribute_ids = array_remove(attribute_ids, OLD.id)
    WHERE OLD.id = ANY(attribute_ids);
    RETURN OLD;
END; $function$
;

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

CREATE OR REPLACE FUNCTION public.ids_exist(ids integer[])
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN EXISTS (
     WITH temp_table AS (
        SELECT UNNEST(ids) AS id
     )
     SELECT 1 FROM attributes JOIN temp_table ON attributes.id = temp_table.id
  );
END;
$function$
;