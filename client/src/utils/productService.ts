import { Json, Tables } from '@/types/database.types';
import supabase from '../lib/supabase/supabaseClient';
import { ProductFormValues } from '@/pages/products/components/ProductForm';

export async function createProduct(
  createProductData: ProductFormValues
): Promise<string> {
  const { data, error } = await supabase
    .from('products')
    .insert([mapProductFormValuesToProductCreationData(createProductData)])
    .select('id')
    .single();
  if (error) throw error;
  return data.id;
}

export async function updateProduct(
  productId: string,
  updateProductData: ProductFormValues
): Promise<string> {
  const { data, error } = await supabase
    .from('products')
    .update(mapProductFormValuesToProductCreationData(updateProductData))
    .match({ id: productId })
    .select('id')
    .single();
  if (error) throw error;
  return data.id;
}

function mapProductFormValuesToProductCreationData(
  data: ProductFormValues
): ProductCreationData {
  const metadata = data.metadata?.reduce(
    (acc: Record<string, unknown>, curr) => {
      acc[curr.title] = curr.description;
      return acc;
    },
    {}
  );

  return {
    name: data.name,
    base_price: data.price,
    description: data.description,
    brand_id: data.brand_id ? +data.brand_id : undefined,
    subcategory_id: data.subcategory_id ? +data.subcategory_id : undefined,
    status: data.status,
    tags: data.tags,
    attributes: data.attributes,
    metadata: metadata as Json,
  };
}

type ProductCreationData = Partial<Tables<'products'>>;
