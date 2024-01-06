DROP TABLE IF EXISTS public.discounts;

CREATE TABLE
    public.discounts (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        "type" public."discount_type" NOT NULL,
        value numeric NOT NULL,
        start_date timestamptz NULL,
        end_date timestamptz NULL,
        qualifiers _text NULL DEFAULT '{}':: text [],
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT discounts_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.inventory;

CREATE TABLE
    public.inventory (
        id bigserial,
        stock_quantity int4 NOT NULL,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT inventory_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.order_items;

CREATE TABLE
    public.order_items (
        id bigserial,
        order_id uuid NOT NULL,
        product_variant_id int8 NOT NULL,
        quantity int4 NOT NULL,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT order_items_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.orders;

CREATE TABLE
    public.orders (
        id uuid NOT NULL DEFAULT gen_random_uuid(),
        customer_id uuid NOT NULL,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT orders_pkey PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS public.orders_discounts;

CREATE TABLE
    public.orders_discounts (
        id bigserial,
        order_id uuid NOT NULL,
        discount_id uuid NOT NULL,
        -------------------------------------
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz NULL,
        -------------------------------------
        CONSTRAINT orders_discounts_pkey PRIMARY KEY (id)
    );