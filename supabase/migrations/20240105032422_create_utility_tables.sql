CREATE TABLE
  public.country_codes (
    "code" int2 NOT NULL,
    "name" text NOT NULL,
    isoCode2 char(2) NOT NULL CONSTRAINT isoCode2_unique UNIQUE,
    isoCode3 char(3) NOT NULL CONSTRAINT isoCode3_unique UNIQUE,
    CONSTRAINT countries_pkey PRIMARY KEY (code)
  );

create table
  us_states (
    "name" text not null,
    "type" us_state_type not null,
    "abbreviation" char(2)
  );