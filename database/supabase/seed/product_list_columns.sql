insert into public.product_list_columns (name, type, is_sortable, is_filterable, is_visible)
values
  ('id', 'string', false, false, true),
  ('name', 'string', true, true, true),
  ('price', 'number', true, true, true),
  ('created_at', 'dateTime', true, true, true),
  ('updated_at', 'dateTime', true, true, true),
  ('status', 'string', true, true, true),
  ('description', 'string', false, false, true),
  ('image', 'image', false, false, true);
