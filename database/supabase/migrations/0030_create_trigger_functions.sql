CREATE OR REPLACE FUNCTION public.fn_after_create_customer_create_cart
() RETURNS TRIGGER 
LANGUAGE plpgsql SECURITY DEFINER AS 
	$$ BEGIN
	INSERT INTO
	    public.carts (
	        customer_id,
	        created_at,
	        updated_at
	    )
	VALUES (NEW.id, now (), now ());
	RETURN NEW;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_after_create_user
() RETURNS TRIGGER 
LANGUAGE plpgsql SECURITY DEFINER AS 
	$$ DECLARE v_profile_id uuid;
	BEGIN
    UPDATE auth.users
    SET
        raw_user_meta_data = '{"role": "user"}':: jsonb
    WHERE id = NEW.id;
    INSERT INTO
        public.profiles (user_id, email, role)
    VALUES (NEW.id, NEW.email, 'user') RETURNING id INTO v_profile_id;
    INSERT INTO
        public.customers (profile_id)
    VALUES (v_profile_id);
    RETURN NEW;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_after_create_user_create_profile
() RETURNS TRIGGER 
LANGUAGE plpgsql SECURITY DEFINER AS 
	$$ BEGIN
    INSERT INTO
        public.profiles (
            user_id,
            email,
            created_at,
            updated_at
        )
    VALUES (NEW.id, NEW.email, now (), now ());
    RETURN NEW;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_after_delete_product_specs_update_product_specs_column
() RETURNS TRIGGER 
LANGUAGE plpgsql AS 
	$$ BEGIN
    UPDATE products
    SET
        specs = fn_get_product_specs (OLD.product_id)
    WHERE id = OLD.product_id;
    RETURN NEW;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_after_update_user_update_profile
() RETURNS TRIGGER 
LANGUAGE plpgsql SECURITY DEFINER AS 
	$$ BEGIN
    UPDATE public.profiles
    SET
        email = NEW.email,
        role = NEW.raw_user_meta_data ->> 'role'
    WHERE user_id = NEW.id;
    RETURN NEW;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_after_upsert_product_specs_update_product_specs_column
() RETURNS TRIGGER 
LANGUAGE plpgsql AS 
	$$ BEGIN
    UPDATE products
    SET
        specs = fn_get_product_specs (NEW.product_id)
    WHERE id = NEW.product_id;
    RETURN NEW;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_trg_check_valid_product_attribute
() RETURNS TRIGGER 
LANGUAGE plpgsql AS 
	$$ BEGIN 
    IF NOT fn_check_valid_product_attribute (
        NEW.attribute_id,
        NEW.product_id
    ) THEN RAISE EXCEPTION 'Invalid product attribute. The attribute_id: % does NOT belong to the product with product_id: %. Please ensure the attribute IS valid FOR the specified product.',
    NEW.attribute_id,
    NEW.product_id;
    END IF;
    RETURN NEW;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_trg_remove_attribute_id
() RETURNS TRIGGER 
LANGUAGE plpgsql AS 
	$$ BEGIN
    UPDATE product_variants
    SET
        attribute_ids = array_remove (attribute_ids, OLD.id)
    WHERE
        OLD.id = ANY (attribute_ids);
    RETURN OLD;
	END;
$$; 

CREATE OR REPLACE FUNCTION public.fn_update_variant_specs_column
() RETURNS TRIGGER 
LANGUAGE plpgsql AS 
	$$ BEGIN
    UPDATE product_variants
    SET
        specs = fn_get_product_variant_specs (NEW.variant_id)
    WHERE id = NEW.variant_id;
    RETURN NEW;
	END;
$$;

CREATE OR REPLACE FUNCTION public.fn_trg_validate_product_before_publish()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
	IF NEW.name IS NULL OR NEW.name= '' THEN
        RAISE EXCEPTION 'The product name cannot be empty.';
    END IF;
end;
$function$
;