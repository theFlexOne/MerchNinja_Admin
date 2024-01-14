DROP TABLE IF EXISTS public.products;

CREATE TABLE
    public.products (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" text NULL,
        description text NULL DEFAULT '':: text,
        thumbnail text NULL,
        base_price numeric(10, 2) NULL CHECK (base_price >= 0),
        brand_id int8 NULL,
        subcategory_id int8 NULL,
        status text NOT NULL DEFAULT 'DRAFT':: text,
        metadata jsonb NOT NULL DEFAULT '{}':: jsonb,
        attributes jsonb NOT NULL DEFAULT '[]':: jsonb,
        tags jsonb NOT NULL DEFAULT '[]':: jsonb,
        -------------------------------------
        CONSTRAINT products_pkey PRIMARY KEY (id),
        CONSTRAINT products_name_key UNIQUE (name)
    ) INHERITS (utility.TABLE_BASE);

DROP TABLE IF EXISTS public.product_variants;

CREATE TABLE
    public.product_variants (
        id bigserial,
        product_id uuid NOT NULL,
        -------------------------------------
        CONSTRAINT product_variants_pkey PRIMARY KEY (id)
    ) INHERITS (utility.TABLE_BASE);

DROP TABLE IF EXISTS public.product_variant_attributes;

CREATE TABLE
    public.product_variant_attributes (
        id BIGSERIAL NOT NULL,
        product_variant_id int8 NOT NULL,
        name text NOT NULL,
        value text NOT NULL,
        -------------------------------------
        CONSTRAINT product_variant_attributes_pkey PRIMARY KEY (id)
    ) INHERITS (utility.TABLE_BASE);

DROP TABLE IF EXISTS public.brands;

CREATE TABLE
    public.brands (
        id bigserial,
        "name" text NOT NULL,
        -------------------------------------
        CONSTRAINT brands_pkey PRIMARY KEY (id)
    ) INHERITS (utility.TABLE_BASE);


DROP TABLE IF EXISTS public.categories;

CREATE TABLE
    public.categories (
        id bigserial,
        "name" text NOT NULL UNIQUE,
        -------------------------------------
        CONSTRAINT categories_pkey PRIMARY KEY (id)
    ) INHERITS (utility.TABLE_BASE);

DROP TABLE IF EXISTS public.subcategories;

CREATE TABLE
    subcategories (
        id bigserial,
        "name" text NOT NULL,
        category_id int8 NOT NULL,
        -------------------------------------
        CONSTRAINT subcategories_pkey PRIMARY KEY (id),
        CONSTRAINT subcategories_unique UNIQUE (category_id, "name")
    ) INHERITS (utility.TABLE_BASE);

DROP TABLE IF EXISTS public.product_reviews;

CREATE TABLE
    public.product_reviews (
        id bigserial,
        "text" text NOT NULL DEFAULT '':: text,
        rating int2 NOT NULL CHECK (rating >= 1 AND rating <= 5),
        customer_id uuid NOT NULL,
        product_id uuid NOT NULL,
        -------------------------------------
        CONSTRAINT product_reviews_pkey PRIMARY KEY (id),
        CONSTRAINT product_reviews_rating_range CHECK (
            rating >= 1
            AND rating <= 5
        )
    ) INHERITS (utility.TABLE_BASE);

DROP TABLE IF EXISTS public.product_variant_images;

CREATE TABLE
    public.product_variant_images (
        id bigserial,
        product_variant_id int8 NOT NULL,
        image_url text NOT NULL,
        -------------------------------------
        CONSTRAINT product_variant_images_pkey PRIMARY KEY (id)
    ) INHERITS (utility.TABLE_BASE);