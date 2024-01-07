import supabase from '@/lib/supabase/supabaseClient';
import { AllTableNames } from '@/types/app.types';

export async function fetchSupabaseData<T>(
  table: AllTableNames,
  fieldList?: string[]
): Promise<T[]> {
  const fields = fieldList ? fieldList.join(',') : '*';
  const { data, error } = await supabase
    .from(table)
    .select(fields)
    .throwOnError();
  if (error) throw error;
  return data as T[];
}
