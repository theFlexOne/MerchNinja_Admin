import { Tables } from '@/types/database.types';
import supabase from '../lib/supabase/supabaseClient';
import { FieldValues } from 'react-hook-form';

export default async function createNewProduct(data: FieldValues) {
  const productData: ProductCreationData = mapFormDataToProductData(data);
  try {
    const newProduct = await createProduct(productData);
    console.log('New product created: ', newProduct);

    const tags = await createProductTags(data.tags, newProduct.id);

  } catch (error) {
    console.error(error);
  }
}

const exampleProduct: ProductCreationData = {
  name: 'Sample T-Shirt',
  base_price: 19.99,
  description: 'A comfortable cotton t-shirt with a unique print',
  brand_id: 1,
  subcategory_id: 2,
  status: 'DRAFT',
  metadata: {
    material: 'cotton',
    fit: 'regular',
  },
};

export type ProductCreationData = Partial<Tables<'products'>> & {
  name: string;
};

async function createProduct(
  createProductData: ProductCreationData
): Promise<Tables<'products'>> {
  const { data, error } = await supabase
    .from('products')
    .insert(createProductData)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function createProductTags(tags: string[], productId: number): Promise<Tables<'tags'>[]> {
  const tagData = tags.map((tag) => ({
    name: tag,
    product_id: productId,
  }));

  const { data, error } = await supabase
    .from('tags')
    .insert(tagData)
    .select('id');
  if (error) throw error;
  return data;
}

async function createProductAttributes

function mapFormDataToProductData(data: FieldValues): ProductCreationData {
  const metadata = data.metadata.reduce(
    (acc: Record<string, unknown>, curr: { key: string; value: string }) => {
      acc[curr.key] = curr.value;
      return acc;
    },
    {} as ProductCreationData['metadata']
  );

  const productData: ProductCreationData = {
    name: data.name,
    base_price: data.base_price,
    description: data.description,
    brand_id: data.brand_id,
    subcategory_id: data.subcategory_id,
    status: 'DRAFT',
    metadata,
  };
  return productData;
}
