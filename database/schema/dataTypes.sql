CREATE TYPE public."role" AS ENUM ('USER', 'ADMIN');

CREATE TYPE public."discount_type" AS ENUM ('PERCENTAGE', 'FIXED');

CREATE type public.us_state_type as enum (
    'STATE',
    'FEDERAL DISTRICT',
    'TERRITORY'
);
