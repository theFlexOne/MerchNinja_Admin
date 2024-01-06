DROP TABLE IF EXISTS public.cart_items;

CREATE TABLE
    public.cart_items (
        id bigserial,
        cart_id int8 NOT NULL,
        quantity int4 NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        CONSTRAINT cart_items_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.carts;

CREATE TABLE
    public.carts (
        id bigserial,
        customer_id uuid NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        CONSTRAINT carts_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.customer_addresses;

CREATE TABLE
    public.customer_addresses (
        id bigserial,
        customer_id uuid NOT NULL,
        street text NOT NULL,
        street2 text NULL,
        city text NOT NULL,
        state text NOT NULL,
        zip text NOT NULL,
        country_code int2 NOT NULL DEFAULT 1,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        CONSTRAINT customer_addresses_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.customers;

CREATE TABLE
    public.customers (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        user_id uuid NOT NULL,
        first_name varchar NULL DEFAULT '""':: character varying,
        last_name varchar NULL DEFAULT '""':: character varying,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        CONSTRAINT customers_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.customer_profiles;

CREATE TABLE
    public.customer_profiles (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        customer_id uuid NOT NULL,
        email text NOT NULL,
        "role" public."role" NOT NULL DEFAULT 'USER',
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        CONSTRAINT profiles_pkey PRIMARY KEY (id)
    );