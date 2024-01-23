CREATE TABLE public.country_codes (
    "code" int2 NOT NULL, "name" text NOT NULL, isoCode2 char(2) NOT NULL CONSTRAINT isoCode2_unique UNIQUE, isoCode3 char(3) NOT NULL CONSTRAINT isoCode3_unique UNIQUE, CONSTRAINT countries_pkey PRIMARY KEY (code)
);

CREATE TABLE public.us_states (
    "name" text NOT NULL, "type" us_state_type NOT NULL, "abbreviation" char(2)
);

CREATE TABLE public.product_status_types (
    "name" text NOT NULL, label text NOT NULL, CONSTRAINT product_status_types_pkey PRIMARY KEY (name)
);

CREATE TABLE public.product_list_columns (
    id BIGSERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, type PRODUCT_LIST_COLUMN_TYPE NOT NULL, is_sortable BOOLEAN NOT NULL DEFAULT FALSE, is_filterable BOOLEAN NOT NULL DEFAULT FALSE, is_visible BOOLEAN NOT NULL DEFAULT TRUE
);