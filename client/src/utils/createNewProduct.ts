import supabase from '../lib/supabase/supabaseClient';

export default async function createNewProduct(productData: ProductCreationData) {
  try {    
    const {data: newProduct, error} = await supabase
    .from('products')
    .insert(
      {
        name: productData.name,
        description: productData.description,
        base_price: productData.base_price,
        thumbnail: productData.thumbnail,
        brandId: productData.brandId,
        subcategoryId: productData.subcategoryId,
        status: productData.status,
        tags: productData.tags,
        metaData: productData.metaData,
      },
    ).select().single();
    
    if (error) throw error;
    const newProductVariants = await createProductVariants(productData.variants, newProduct.id);
    return {...newProduct, variants: newProductVariants}
  } catch (error) {
    console.log(error);
  }
}

async function createProductVariants(variants: Variant[], productId: string) {
  try {
    const { data: newProductVariants, error } = await supabase
    .from('product_variants')
    .insert(variants.map((variant) => {
      return {
        "product_id": productId,
        "attributes": variant.attributes,
      }}))
    .select();
    if (error) throw error;
    newProductVariants.forEach(async (variant, index) => {
      await 
    return newProductVariants;
  } catch (error) {
    console.log(error);
  }
}

const exampleProduct = {
  name: 'Sample T-Shirt',
  description: 'A comfortable cotton t-shirt with a unique print',
  base_price: 19.99,
  thumbnail: 'https://example.com/thumbnail.jpg',
  brandId: 1,
  subcategoryId: 2,
  status: 'available',
  tags: ['casual', 'cotton', 'print'],
  metaData: {
    key: 'value',
  },
  variants: [
    {
      price: 22.99,
      sku: 'TSHT-001-SM',
      quantity: 50,
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
      metaData: {
        material: 'cotton',
        care_instructions: 'Machine wash',
      },
      attributes: [
        {
          key: 'size',
          value: 'small',
        },
        {
          key: 'color',
          value: 'blue',
        },
      ],
    },
    {
      price: 22.99,
      sku: 'TSHT-001-MD',
      quantity: 50,
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
      metaData: {
        material: 'cotton',
        care_instructions: 'Machine wash',
      },
      attributes: [
        {
          key: 'size',
          value: 'medium',
        },
        {
          key: 'color',
          value: 'blue',
        },
      ],
    },
  ],
};

type ProductCreationData = {
  name: string;
  description: string;
  base_price: number;
  thumbnail: string;
  brandId: number;
  subcategoryId: number;
  status: string;
  tags: string[];
  metaData: Record<string, string | number>;
  variants: Variant[];
};

type Variant = {
  price: number;
  sku: string;
  quantity: number;
  images: string[];
  metaData: Record<string, string | number>;
  attributes: Attribute[];
};

type Attribute = {
  key: string;
  value: string;
};
