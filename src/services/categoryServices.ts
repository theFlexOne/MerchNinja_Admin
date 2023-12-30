import supabase from '@/lib/supabase/supabaseClient';

export async function getCategories(...columns: string[]) {
  const selectedColumns = columns.length ? columns.join(',') : '*';
  const { data, error } = await supabase
    .from('categories')
    .select(selectedColumns);
  if (error) {
    throw error;
  }
  return data;
}
