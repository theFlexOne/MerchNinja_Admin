import supabase from '@/lib/supabase/supabaseClient';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const supabaseDataFunctions = {
  categories: () => supabase.from('categories').select('id, name'),
  brands: () => supabase.from('product_brands').select('id, name'),
  productGroups: () => supabase.from('product_groups').select('id, name'),
};

export default function useSupaBaseData(
  key: keyof typeof supabaseDataFunctions
) {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const { data, error } = await supabaseDataFunctions[key]();
        if (error) {
          throw error;
        }
        setData(data);
      } catch (error) {
        console.error(error);
        navigate('/error', { state: { error } });
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [key, navigate]);

  return { data, isLoading };
}
