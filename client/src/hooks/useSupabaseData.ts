import supabase from '@/lib/supabase/supabaseClient';
import { useEffect, useState } from 'react';
import { AllTableNames } from '@/types/app.types';

const supabaseTableMap: Record<string, AllTableNames> = {
  productGroups: 'product_groups',
  brands: 'product_brands',
  categories: 'product_categories',
};

export default function useSupabaseData(
  key: keyof typeof supabaseTableMap,
  fieldList?: string[]
) {
  const [data, setData] = useState<unknown[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const data = await fetchSupabaseData(supabaseTableMap[key], fieldList);
        console.log(key, data);

        setData(data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [key]);

  return { data, isLoading };
}

// async function getProductGroups(): Promise<{
//   data: ProductGroup[] | null;
//   error: Error | null;
// }> {
//   try {
//     const { data: productGroupsData, error } = await supabase
//       .from('product_groups')
//       .select('id, name, attributeIds:attribute_ids');
//     if (error) {
//       throw error;
//     }

//     if (!productGroupsData) {
//       return {
//         data: null,
//         error: null,
//       };
//     }

//     const productGroups: ProductGroup[] = await Promise.all(
//       productGroupsData.map(async (productGroupData) => {
//         const productGroup: ProductGroup = {
//           id: productGroupData.id,
//           name: productGroupData.name,
//           attributes: [],
//         };
//         const { data: productGroupAttributesData, error } = await supabase
//           .from('attributes')
//           .select('id, name')
//           .in('id', productGroupData.attributeIds);
//         if (error) {
//           throw error;
//         }

//         productGroupAttributesData?.forEach((attribute) => {
//           productGroup.attributes.push({
//             id: attribute.id,
//             name: attribute.name,
//             value: '',
//           });
//         });

//         return productGroup;
//       })
//     );

//     return {
//       data: productGroups,
//       error: null,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       data: null,
//       error: error as Error,
//     };
//   }
// }

// async function getProductGroupsOld(): Promise<{
//   data: ProductGroup[] | null;
//   error: Error | null;
// }> {
//   try {
//     const productGroups: ProductGroup[] = [];
//     const { data: productGroupsData, error } = await supabase
//       .from('product_groups')
//       .select('id, name, attributeIds:attribute_ids');
//     if (error) {
//       throw error;
//     }

//     productGroupsData?.forEach(async (productGroupData) => {
//       const productGroup: ProductGroup = {
//         id: productGroupData.id,
//         name: productGroupData.name,
//         attributes: [],
//       };
//       const { data: productGroupAttributesData, error } = await supabase
//         .from('attributes')
//         .select('id, name')
//         .in('id', productGroupData.attributeIds);
//       if (error) {
//         throw error;
//       }

//       productGroupAttributesData?.forEach(async (attribute) => {
//         productGroup.attributes.push({
//           id: attribute.id,
//           name: attribute.name,
//           value: '',
//         });
//       });
//       console.log('productGroup', productGroup);

//       productGroups.push(productGroup);
//       console.log('productGroups', productGroups);
//     });
//     return {
//       data: productGroups,
//       error: null,
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       data: null,
//       error: error as Error,
//     };
//   }
// }
