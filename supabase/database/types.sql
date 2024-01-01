DROP TYPE IF EXISTS public."discount_type";
CREATE TYPE public."discount_type" AS ENUM (
	'PERCENTAGE',
	'FIXED');

DROP TYPE IF EXISTS public."role";
CREATE TYPE public."role" AS ENUM (
	'user',
	'admin');