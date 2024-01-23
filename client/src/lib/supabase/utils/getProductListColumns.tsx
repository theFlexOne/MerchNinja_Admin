import { ColDef } from '@/components/DataGrid';
import supabase from '@/lib/supabase/supabaseClient';
import { Tables } from '@/types/database.types';

const getProductListColumns = async (): Promise<ColDef[]> => {
  const { data, error } = await supabase
    .from('product_list_columns')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  const colDefs: ColDef[] = (data as Tables<'product_list_columns'>[]).map(
    (colDef) => ({
      headerName: String(colDef.name),
      dataType: colDef.type,
      isVisible: Boolean(colDef.is_visible),
      isSortable: Boolean(colDef.is_sortable),
      isFilterable: Boolean(colDef.is_filterable),
    })
  );

  return colDefs;
};

export default getProductListColumns;
