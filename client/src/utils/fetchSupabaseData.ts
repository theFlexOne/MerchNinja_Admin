import supabase from '@/lib/supabase/supabaseClient';
import { AllTableNames } from '@/types/app.types';

export async function fetchSupabaseData(
  table: AllTableNames,
  fieldList?: string[]
): Promise<unknown[]> {
  const fields = fieldList ? fieldList.join(',') : '*';
  const { data } = await supabase.from(table).select(fields).throwOnError();
  console.log('data', data);
  return data ?? [];
}
