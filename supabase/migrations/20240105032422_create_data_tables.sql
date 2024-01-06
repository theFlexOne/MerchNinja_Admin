CREATE TABLE
    public.country_codes (
        "code" int2 NOT NULL,
        "name" text NOT NULL,
        isoCode2 char(2) NOT NULL CONSTRAINT isoCode2_unique UNIQUE,
        isoCode3 char(3) NOT NULL CONSTRAINT isoCode3_unique UNIQUE,
        CONSTRAINT countries_pkey PRIMARY KEY (code)
    );

CREATE table
    us_states (
        "name" text NOT null,
        "type" us_state_type NOT null,
        "abbreviation" char(2)
    );