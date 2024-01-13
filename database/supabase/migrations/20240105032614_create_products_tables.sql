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
        CONSTRAINT products_name_key UNIQUE (name)
    ) INHERITS (TABLE_BASE);

DROP TABLE IF EXISTS public.product_variants;

CREATE TABLE
    public.product_variants (
        id bigserial,
        product_id uuid NOT NULL,
        -------------------------------------
        CONSTRAINT product_variants_pkey PRIMARY KEY (id)
    ) INHERITS (TABLE_BASE);

DROP TABLE IF EXISTS public.attribute_fields;

CREATE TABLE
    public.attribute_fields (
        id BIGSERIAL NOT NULL,
        name text NOT NULL UNIQUE,
        -------------------------------------
        CONSTRAINT attribute_fields_pkey PRIMARY KEY (id)
    ) INHERITS (TABLE_BASE);

DROP TABLE IF EXISTS public.products_attributes;

CREATE TABLE
    public.products_attributes (
        id BIGSERIAL NOT NULL,
        product_id uuid NOT NULL,
        attribute_field_id int8 NOT NULL,
        -------------------------------------
        CONSTRAINT products_attributes_pkey PRIMARY KEY (id)
    ) INHERITS (TABLE_BASE);

DROP TABLE IF EXISTS public.product_variant_attributes;

CREATE TABLE
    public.product_variant_attributes (
        id BIGSERIAL NOT NULL,
        product_variant_id int8 NOT NULL,
        product_attribute_id int8 NOT NULL,
        value text NOT NULL,
        -------------------------------------
        CONSTRAINT product_variant_attributes_pkey PRIMARY KEY (id)
    ) INHERITS (TABLE_BASE);

DROP TABLE IF EXISTS public.brands;

CREATE TABLE
    public.brands (
        id bigserial,
        "name" text NOT NULL,
        -------------------------------------
        CONSTRAINT brands_pkey PRIMARY KEY (id)
    ) INHERITS (TABLE_BASE);

DROP TABLE IF EXISTS public.tags;

CREATE TABLE
    public.tags (
        id bigserial,
        "name" varchar NOT NULL UNIQUE,
        -------------------------------------
        CONSTRAINT tags_pkey PRIMARY KEY (id)
    ) INHERITS (TABLE_BASE);

DROP TABLE IF EXISTS public.categories;

CREATE TABLE
    public.categories (
        id bigserial,
        "name" text NOT NULL UNIQUE,
        -------------------------------------
        CONSTRAINT categories_pkey PRIMARY KEY (id)
    ) INHERITS (TABLE_BASE);

DROP TABLE IF EXISTS public.subcategories;

CREATE TABLE
    subcategories (
        id bigserial,
        "name" text NOT NULL,
        category_id int8 NOT NULL,
        -------------------------------------
        CONSTRAINT subcategories_pkey PRIMARY KEY (id),
        CONSTRAINT subcategories_unique UNIQUE (category_id, "name")
    ) INHERITS (TABLE_BASE);

DROP TABLE IF EXISTS public.spec_fields;

CREATE TABLE
    public.spec_fields (
        id bigserial,
        "name" text NOT NULL UNIQUE,
        -------------------------------------
        CONSTRAINT spec_fields_pkey PRIMARY KEY (id)
    ) INHERITS (TABLE_BASE);

DROP TABLE IF EXISTS public.product_reviews;

CREATE TABLE
    public.product_reviews (
        id bigserial,
        message text NOT NULL DEFAULT '':: text,
        rating int2 NOT NULL,
        customer_id uuid NOT NULL,
        product_id uuid NOT NULL,
        -------------------------------------
        CONSTRAINT product_reviews_pkey PRIMARY KEY (id),
        CONSTRAINT product_reviews_rating_range CHECK (
            rating >= 1
            AND rating <= 5
        )
    ) INHERITS (TABLE_BASE);

DROP TABLE IF EXISTS public.product_tags;

CREATE TABLE
    public.product_tags (
        id bigserial,
        product_id uuid NOT NULL,
        tag_id int8 NOT NULL,
        -------------------------------------
        CONSTRAINT product_tags_pkey PRIMARY KEY (id)
    ) INHERITS (TABLE_BASE);

DROP TABLE IF EXISTS public.products_specs;

CREATE TABLE
    public.products_specs (
        id bigserial,
        product_id uuid NOT NULL,
        spec_field_id int8 NOT NULL,
        value text NULL,
        -------------------------------------
        CONSTRAINT products_specs_pkey PRIMARY KEY (id)
    ) INHERITS (TABLE_BASE);

CREATE TABLE
    public.product_variant_images (
        id bigserial,
        product_variant_id int8 NOT NULL,
        image text NOT NULL,
        -------------------------------------
        CONSTRAINT product_variant_images_pkey PRIMARY KEY (id)
    ) INHERITS (TABLE_BASE);