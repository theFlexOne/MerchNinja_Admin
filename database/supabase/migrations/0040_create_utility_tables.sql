CREATE SCHEMA IF NOT EXISTS utility;

CREATE TABLE IF NOT EXISTS utility.TABLE_BASE (
  deleted boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz NULL
);