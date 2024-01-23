CREATE TYPE public."role" AS ENUM ('USER', 'ADMIN');

CREATE TYPE public."discount_type" AS ENUM ('PERCENTAGE', 'FIXED');

CREATE TYPE public.us_state_type AS ENUM (
    'STATE',
    'FEDERAL DISTRICT',
    'TERRITORY'
);

CREATE TYPE PRODUCT_LIST_COLUMN_TYPE AS ENUM ('number', 'string', 'date', 'dateTime', 'time', 'boolean', 'image');
