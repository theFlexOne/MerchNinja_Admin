DROP TABLE IF EXISTS public.products;

CREATE TABLE
    public.products (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" text NOT NULL,
        briefDescription text NULL DEFAULT '':: text,
        description text NULL DEFAULT '':: text,
        thumbnail text NULL,
        price numeric NULL DEFAULT 0.00,
        brand_id int8 NULL,
        category_id int8 NULL,
        product_group_id int8 NULL,
        categories _text NULL,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT products_name_key UNIQUE (name),
        CONSTRAINT products_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.product_brands;

CREATE TABLE
    public.product_brands (
        id bigserial,
        "name" text NOT NULL,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT product_brands_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.product_groups;

CREATE TABLE
    public.product_groups (
        id bigserial,
        "name" text NOT NULL,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT product_groups_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.tags;

CREATE TABLE
    public.tags (
        id bigserial,
        "name" varchar NOT NULL UNIQUE,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT tags_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.attributes;

CREATE TABLE
    public.attributes (
        id BIGSERIAL NOT NULL,
        name text NOT NULL UNIQUE,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT attributes_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.product_categories;

CREATE TABLE
    public.product_categories (
        id bigserial,
        "name" text NOT NULL UNIQUE,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT product_categories_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.product_subcategories;

CREATE TABLE
    product_subcategories (
        id bigserial,
        "name" text NOT NULL,
        product_category_id int8 NOT NULL,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT product_subcategories_pkey PRIMARY KEY (id),
        CONSTRAINT product_subcategories_unique UNIQUE (product_category_id, "name")
    );

DROP TABLE IF EXISTS public.spec_fields;

CREATE TABLE
    public.spec_fields (
        id bigserial,
        "name" text NOT NULL UNIQUE,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT spec_fields_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.product_reviews;

CREATE TABLE
    public.product_reviews (
        id bigserial,
        message text NOT NULL DEFAULT '':: text,
        rating int2 NOT NULL,
        customer_id uuid NOT NULL,
        product_id uuid NOT NULL,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT product_reviews_pkey PRIMARY KEY (id),
        CONSTRAINT product_reviews_rating_range CHECK (
            rating >= 1
            AND rating <= 5
        )
    );

DROP TABLE IF EXISTS public.product_tags;

CREATE TABLE
    public.product_tags (
        id bigserial,
        product_id uuid NOT NULL,
        tag_id int8 NOT NULL,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT product_tags_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.products_specs;

CREATE TABLE
    public.products_specs (
        id bigserial,
        product_id uuid NOT NULL,
        spec_field_id int8 NOT NULL,
        value text NULL,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT products_specs_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.product_attributes;

CREATE TABLE
    public.products_attributes (
        id bigserial,
        product_id uuid NOT NULL,
        attribute_id int8 NOT NULL,
        value text NOT NULL,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT product_attributes_pkey PRIMARY KEY (id)
    );