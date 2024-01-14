import { Tables } from '@/types/database.types';
import supabase from '../lib/supabase/supabaseClient';
import { FieldValues } from 'react-hook-form';

export default async function saveProduct(formData: FieldValues) {
  const productData: ProductCreationData = mapFormDataToProductData(formData);
  let productId: string;
  try {
    if (formData.id) {
      productId = await updateProduct(formData.id, productData);
    } else {
      productId = await createProduct(productData);
    }

    formData.id = productId;
    return formData;
  } catch (error) {
    console.error(error);
  }
}

export async function createProduct(
  createProductData: FieldValues
): Promise<string> {
  const { data, error } = await supabase
    .from('products')
    .insert([mapFormDataToProductData(createProductData)])
    .select('id')
    .single();
  if (error) throw error;
  return data.id;
}

export async function updateProduct(
  productId: string,
  updateProductData: FieldValues
): Promise<string> {
  const { data, error } = await supabase
    .from('products')
    .update(mapFormDataToProductData(updateProductData))
    .match({ id: productId })
    .select('id')
    .single();
  if (error) throw error;
  return data.id;
}

function mapFormDataToProductData(data: FieldValues): ProductCreationData {
  const metadata = data.metadata.reduce(
    (
      acc: Record<string, unknown>,
      curr: { title: string; description: string }
    ) => {
      acc[curr.title] = curr.description;
      return acc;
    },
    {} as ProductCreationData['metadata']
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
    metadata,
  };
}

type ProductCreationData = Partial<Tables<'products'>>;
