CREATE OR REPLACE FUNCTION public.fn_category_leafs
() RETURNS TABLE(id bigint, name text, parent_id bigint
) 
LANGUAGE plpgsql AS 
	$$ BEGIN
	RETURN QUERY
	SELECT
	    c1.id,
	    c1.name,
	    c1.parent_id
	FROM categories c1
	WHERE NOT EXISTS (
	        SELECT 1
	        FROM categories c2
	        WHERE c1.id = c2.parent_id
	    );
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_check_attribute_fn_ids_exist
(p_attribute_ids bigint[]) RETURNS boolean 
LANGUAGE plpgsql AS 
	$$ DECLARE v_attribute_id bigint;
	BEGIN FOREACH v_attribute_id IN ARRAY p_attribute_ids
	LOOP IF NOT EXISTS (
	        SELECT 1
	        FROM attributes a
	        WHERE
	            a.id = v_attribute_id
	    ) THEN
	RETURN false;
	END IF;
	END LOOP;
	RETURN true;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_check_unique_elements_in_array
(bigint_array bigint[]) RETURNS boolean 
LANGUAGE plpgsql AS 
	$$ DECLARE unique_count INTEGER;
	total_count INTEGER;
	BEGIN
	SELECT
	    COUNT (*) INTO unique_count
	FROM (
	        SELECT
	            DISTINCT unnest (bigint_array)
	    ) AS unique_elements;
	SELECT array_length (bigint_array, 1) INTO total_count;
	RETURN unique_count = total_count;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_check_valid_product_attribute
(p_attribute_id bigint, p_product_id uuid) RETURNS boolean 
LANGUAGE plpgsql AS 
	$$ DECLARE v_attribute_ids bigint [];
	BEGIN IF p_product_id IS NULL THEN RETURN true;
	END IF;
	SELECT
	    pg.attribute_ids INTO v_attribute_ids
	FROM products p
	    LEFT JOIN product_variants pg ON p.product_set_id = pg.id
	WHERE p.id = p_product_id;
	IF v_attribute_ids IS NULL
	OR p_attribute_id = any (v_attribute_ids) THEN
	RETURN true;
	END IF;
	RETURN false;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_create_categories
(p_category_names text[]) RETURNS bigint 
LANGUAGE plpgsql AS 
	$$ DECLARE v_cat_name text;
	v_parent_id bigint;
	v_current_cat_id bigint;
	BEGIN v_parent_id := NULL;
	FOREACH v_cat_name IN ARRAY p_category_names
	LOOP v_current_cat_id := NULL;
	RAISE NOTICE 'parent_id = %', v_parent_id;
	SELECT id INTO v_current_cat_id
	FROM categories
	WHERE
	    name = v_cat_name
	    AND parent_id IS NOT DISTINCT
	FROM v_parent_id;
	IF v_current_cat_id IS NULL THEN
	INSERT INTO
	    categories (name, parent_id)
	VALUES (v_cat_name, v_parent_id) RETURNING id INTO v_parent_id;
	ELSE v_parent_id := v_current_cat_id;
	END IF;
	END LOOP;
	RETURN v_parent_id;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_create_category
(p_name text, p_parent_id bigint) RETURNS bigint 
LANGUAGE plpgsql AS 
	$$ DECLARE v_category_id bigint;
	v_parent_id bigint;
	BEGIN IF (
	    p_parent_id IS NOT NULL
	    AND EXISTS (
	        SELECT 1
	        FROM categories
	        WHERE
	            id = p_parent_id
	    )
	)
	OR p_parent_id IS NULL THEN
	INSERT INTO
	    categories (name, parent_id)
	VALUES (p_name, p_parent_id) RETURNING id INTO v_category_id;
	END IF;
	RETURN v_category_id;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_create_product
(p_name text, p_description text, p_base_price numeric, p_thumbnail 
text, p_brand text, p_category text, p_parent_category 
text, p_specs jsonb, p_tags text[]) RETURNS uuid 
LANGUAGE plpgsql AS 
	$$ DECLARE v_brand_id bigint;
	v_category_id bigint;
	v_new_product_id uuid;
	v_error_context text;
	v_error_msg text;
	BEGIN SELECT fn_find_or_create_brand (p_brand) INTO v_brand_id;
	SELECT
	    fn_find_or_create_category (p_category, p_parent_category) INTO v_category_id;
	INSERT INTO
	    public.products (
	        name,
	        base_price,
	        description,
	        thumbnail,
	        brand_id,
	        category_id
	    )
	VALUES (
	        p_name,
	        p_base_price,
	        p_description,
	        p_thumbnail,
	        v_brand_id,
	        v_category_id
	    ) RETURNING id INTO v_new_product_id;
	IF p_tags IS NOT NULL THEN PERFORM fn_create_product_tags (v_new_product_id, p_tags);
	END IF;
	IF p_specs IS NOT NULL THEN perform fn_create_product_specs (v_new_product_id, p_specs);
	END IF;
	RETURN v_new_product_id;
	EXCEPTION
	WHEN OTHERS THEN GET STACKED DIAGNOSTICS v_error_context = PG_EXCEPTION_CONTEXT,
	v_error_msg = MESSAGE_TEXT;
	RAISE EXCEPTION 'Error: %, Context: %',
	v_error_msg,
	v_error_context;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_create_categories
(p_product_id uuid, p_category_id bigint) RETURNS bigint 
LANGUAGE plpgsql AS 
	$$ DECLARE v_category_id bigint;
	BEGIN
	INSERT INTO
	    categories (product_id, category_id)
	VALUES (p_product_id, p_category_id) RETURNING * INTO v_category_id;
	RETURN v_category_id;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_create_product_specs
(p_product_id uuid, specs jsonb) RETURNS void 
LANGUAGE plpgsql AS 
	$$ DECLARE v_key text;
	v_value text;
	v_spec_id bigint;
	BEGIN FOR v_key,
	v_value IN
	SELECT *
	FROM jsonb_each (specs)
	LOOP
	SELECT id INTO v_spec_id
	FROM spec_fields
	WHERE name = v_key;
	IF v_spec_id IS NULL THEN
	INSERT INTO spec_fields (name)
	VALUES (v_key) RETURNING id INTO v_spec_id;
	END IF;
	RAISE NOTICE 'value: %', v_value;
	IF (
	    SELECT substring (
	            v_value
	            FROM
	                1 FOR 1
	        ) = '"'
	) THEN v_value := substring (
	    v_value
	    FROM
	        1 FOR char_length (v_value)
	);
	END IF;
	IF (
	    SELECT substring (
	            v_value
	            FROM
	                char_length (v_value) - 1 FOR 1
	        ) = '"'
	) THEN v_value := substring (
	    v_value
	    FROM
	        1 FOR char_length (v_value) - 1
	);
	END IF;
	INSERT INTO
	    product_specs (product_id, spec_id, value)
	VALUES (
	        p_product_id,
	        v_spec_id,
	        substring (
	            v_value
	            FROM
	                2 FOR char_length (v_value) - 2
	        )
	    );
	END LOOP;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_create_product_tags
(p_product_id uuid, p_tags text[]) RETURNS void 
LANGUAGE plpgsql AS 
	$$ DECLARE d_tag_id bigint;
	d_tag_name text;
	BEGIN FOREACH d_tag_name IN ARRAY p_tags
	LOOP
	    d_tag_id := fn_find_or_create_tag (d_tag_name);
	INSERT INTO
	    public.product_tags (
	        product_id,
	        tag_id,
	        created_at,
	        updated_at
	    )
	VALUES (
	        p_product_id,
	        d_tag_id,
	        now (),
	        now ()
	    );
	END LOOP;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_find_or_create_brand
(p_name text) RETURNS bigint 
LANGUAGE plpgsql AS 
	$$ DECLARE v_brand_id bigint;
	BEGIN -- Check IF the brand already EXISTS
	SELECT id INTO v_brand_id
	FROM public.brands
	WHERE name = p_name;
	-- If it doesn't exist, CREATE a NEW one
	IF v_brand_id IS NULL THEN
	INSERT INTO
	    public.brands (name)
	VALUES (p_name) RETURNING id INTO v_brand_id;
	END IF;
	-- Return the brand ID
	RETURN v_brand_id;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_find_or_create_category
(p_cat_name text, p_parent_id bigint) RETURNS bigint 
LANGUAGE plpgsql AS 
	$$ DECLARE v_category_id bigint;
	BEGIN IF p_parent_id = 0 THEN p_parent_id := NULL;
	END IF;
	SELECT id INTO v_category_id
	FROM categories
	WHERE
	    name = p_cat_name
	    AND parent_id IS NOT DISTINCT
	FROM p_parent_id;
	IF v_category_id IS NULL THEN
	INSERT INTO
	    categories (name, parent_id)
	VALUES (p_cat_name, p_parent_id) RETURNING id INTO v_category_id;
	END IF;
	RETURN v_category_id;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_find_or_create_category
(p_cat_name text, p_parent_name text) RETURNS bigint 
LANGUAGE plpgsql AS 
	$$ DECLARE v_category_id bigint;
	v_parent_id bigint;
	BEGIN v_parent_id := NULL;
	IF p_parent_name IS NOT NULL THEN
	SELECT id INTO v_parent_id
	FROM categories
	WHERE name = p_parent_name;
	END IF;
	SELECT id INTO v_category_id
	FROM categories
	WHERE
	    name = p_cat_name
	    AND parent_id IS NOT DISTINCT
	FROM v_parent_id;
	IF v_category_id IS NULL THEN
	INSERT INTO
	    categories (name, parent_id)
	VALUES (p_cat_name, v_parent_id) RETURNING id INTO v_category_id;
	END IF;
	RETURN v_category_id;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_find_or_create_tag
(p_tag_name text) RETURNS bigint 
LANGUAGE plpgsql AS 
	$$ DECLARE d_tag_id bigint;
	BEGIN
	SELECT id INTO d_tag_id
	FROM public.tags
	WHERE name = p_tag_name;
	IF d_tag_id IS NULL THEN
	INSERT INTO
	    public.tags (name, created_at, updated_at)
	VALUES (p_tag_name, now (), now ()) RETURNING id INTO d_tag_id;
	END IF;
	RETURN d_tag_id;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_get_category_chain
(p_product_id uuid) RETURNS text[] 
LANGUAGE plpgsql AS 
	$$ DECLARE d_category_id bigint;
	d_category_name text;
	d_chain text [];
	BEGIN -- Get the category_id FOR the given product
	SELECT
	    category_id INTO d_category_id
	FROM products
	WHERE p_product_id = id;
	-- Initialize the chain as an empty string
	d_chain := ARRAY []:: text [];
	-- Loop to build the category chain
	WHILE
	    d_category_id IS NOT NULL
	LOOP
	SELECT
	    name,
	    parent_id INTO d_category_name,
	    d_category_id
	FROM categories
	WHERE id = d_category_id;
	-- Add the category name to the array
	d_chain := array_prepend (d_category_name, d_chain);
	END LOOP;
	RETURN d_chain;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_get_category_tree
() RETURNS jsonb 
LANGUAGE plpgsql AS 
	$$ DECLARE RESULT jsonb;
	BEGIN
	SELECT
	    jsonb_agg (
	        jsonb_build_object (
	            'id',
	            c.id,
	            'name',
	            c.name,
	            'children',
	            COALESCE (
	                fn_get_child_categories (c.id),
	                '[]':: jsonb
	            )
	        )
	    ) INTO RESULT
	FROM public.categories c
	WHERE c.parent_id IS NULL;
	RETURN RESULT;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_get_child_categories
(p_parent_id bigint) RETURNS jsonb 
LANGUAGE plpgsql AS 
	$$ DECLARE child_result jsonb;
	BEGIN
	SELECT
	    jsonb_agg (
	        jsonb_build_object (
	            'id',
	            c.id,
	            'name',
	            c.name,
	            'children',
	            COALESCE (
	                fn_get_child_categories (c.id),
	                '[]':: jsonb
	            )
	        )
	    ) INTO child_result
	FROM public.categories c
	WHERE c.parent_id = p_parent_id;
	RETURN COALESCE (child_result, '[]':: jsonb);
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_get_categories
(p_product_id uuid) RETURNS text[] 
LANGUAGE plpgsql AS 
	$$ DECLARE v_category_hierarchy text [];
	v_category_name text;
	v_parent_id bigint;
	BEGIN
	SELECT
	    category_id INTO v_parent_id
	FROM products
	WHERE id = p_product_id;
	while v_parent_id IS NOT NULL LOOP v_category_name := NULL;
	SELECT
	    name,
	    parent_id INTO v_category_name,
	    v_parent_id
	FROM categories
	WHERE id = v_parent_id;
	v_category_hierarchy := v_category_name || v_category_hierarchy;
	END LOOP;
	RETURN v_category_hierarchy;
	END;
$$; 


CREATE OR REPLACE FUNCTION public.fn_get_product_specs
(p_product_id uuid) RETURNS jsonb 
LANGUAGE plpgsql AS 
	$$ DECLARE v_result jsonb := '{}':: jsonb;
	v_row record;
	v_key text;
	BEGIN FOR v_row IN (
	    SELECT *
	    FROM product_specs
	    WHERE
	        product_id = p_product_id
	)
	LOOP
	    RAISE NOTICE '%',
	    v_row.spec_id;
	SELECT name INTO v_key FROM spec_fields WHERE id = v_row.spec_id;
	v_result := v_result || jsonb_build_object (v_key, v_row.value);
	END LOOP;
	RETURN v_result;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_get_product_rating
(p_product_id bigint) RETURNS numeric 
LANGUAGE plpgsql AS 
	$$ DECLARE v_rating numeric;
	BEGIN
		SELECT
				round (
						coalesce (avg (pr.rating), 0):: numeric,
						2
				) INTO v_rating
		FROM product_reviews pr
				JOIN products p ON p.id = pr.product_id
		WHERE p.id = p_product_id;
		RETURN v_rating;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_get_to_many_foreign_tables_array
(p_table_name text) RETURNS text[] 
LANGUAGE plpgsql AS 
	$$ DECLARE v_result text [];
	BEGIN
		SELECT
				array_agg (ccu.table_name) INTO v_result
		FROM
				information_schema.table_constraints AS tc
				JOIN information_schema.key_column_usage AS kcu ON kcu.constraint_name = tc.constraint_name
				JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
		WHERE
				tc.constraint_type = 'FOREIGN KEY'
				AND tc.table_schema = 'public'
				AND tc.table_name = p_table_name;
		RETURN v_result;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_get_to_one_foreign_tables_array
(p_table_name text) RETURNS text[] 
LANGUAGE plpgsql AS 
	$$ DECLARE v_result text [];
	BEGIN
		SELECT
				array_agg (tc.table_name) INTO v_result
		FROM
				information_schema.table_constraints AS tc
				JOIN information_schema.key_column_usage AS kcu ON kcu.constraint_name = tc.constraint_name
				JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
		WHERE
				tc.constraint_type = 'FOREIGN KEY'
				AND tc.table_schema = 'public'
				AND ccu.table_name = p_table_name;
		RETURN v_result;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_is_admin() RETURNS 
boolean 
LANGUAGE plpgsql AS 
	$$ BEGIN
		RETURN (
						SELECT EXISTS (
										SELECT 1
										FROM public.admins
										WHERE user_id = auth.uid ()
								)
				);
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_ids_exist(ids integer[]
) RETURNS boolean 
LANGUAGE plpgsql AS 
	$$ BEGIN
		RETURN EXISTS (
						WITH temp_table AS (
										SELECT UNNEST (ids) AS id
								)
						SELECT 1
						FROM attributes
								JOIN temp_table ON attributes.id = temp_table.id
				);
	END;
$$;
