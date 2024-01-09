CREATE TABLE
    public.country_codes (
        "code" int2 NOT NULL,
        "name" text NOT NULL,
        isoCode2 char(2) NOT NULL CONSTRAINT isoCode2_unique UNIQUE,
        isoCode3 char(3) NOT NULL CONSTRAINT isoCode3_unique UNIQUE,
        CONSTRAINT countries_pkey PRIMARY KEY (code)
    );

CREATE TABLE
    public.us_states (
        "name" text NOT NULL,
        "type" us_state_type NOT NULL,
        "abbreviation" char(2)
    );

CREATE TABLE
    public.product_status_types (
        "name" text NOT NULL,
        label text NOT NULL,
        CONSTRAINT product_status_types_pkey PRIMARY KEY (name)
    );

INSERT INTO public.product_status_types ("name", label)
VALUES 
    ('DRAFT', 'Draft'),
    ('PUBLISHED', 'Published'),
    ('ARCHIVED', 'Archived');