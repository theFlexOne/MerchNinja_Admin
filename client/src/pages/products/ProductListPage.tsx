import Page from './components/Page';
import PageHeader from './components/PageHeader';
import Checkbox from '@/components/form/Checkbox';
import Panel from '@/components/layout/panel/Panel';
import { useEffect, useState } from 'react';
import getProductListColumns from '@/lib/supabase/utils/getProductListColumns';
import { Database } from '@/types/database.types';
import supabase from '@/lib/supabase/supabaseClient';
import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHeader,
  DataTableRow,
} from '@/components/dataTable';
import { ColDef } from '@/components/dataTable/types';

export default function ProductListPage() {
  return (
    <Page className='p-8'>
      <PageHeader heading='Products' />
      <div className='w-full'>
        <Panel>
          <ProductsList />
        </Panel>
      </div>
    </Page>
  );
}

function ProductsList() {
  const [products, setProducts] = useProductList();
  const [colDefs, setColDefs] = useColDefs();

  const handleHeaderClick = (colDef: ColDef) => {
    if (colDef.isSortable) {
      const newProducts = sortProductsBy(colDef, products);
      setProducts(newProducts);
    }
  };

  return (
    <DataTable>
      <DataTableHeader>
        <DataTableRow>
          <DataTableCell>
            <Checkbox />
          </DataTableCell>
          {colDefs
            .filter((colDef) => colDef.isVisible)
            .map((colDef) => (
              <DataTableCell
                key={colDef.headerName}
                onClick={() => handleHeaderClick(colDef)}
              >
                {colDef.headerName}
              </DataTableCell>
            ))}
          <DataTableCell>Actions</DataTableCell>
        </DataTableRow>
      </DataTableHeader>
      <DataTableBody>
        {products.map((product) => (
          <DataTableRow key={product.id as string}>
            <DataTableCell>
              <Checkbox />
            </DataTableCell>
            {colDefs
              .filter((colDef) => colDef.isVisible)
              .map((colDef) => (
                <DataTableCell key={colDef.headerName}>
                  {displayData(product, colDef)}
                </DataTableCell>
              ))}
            <DataTableCell>Actions</DataTableCell>
          </DataTableRow>
        ))}
      </DataTableBody>
    </DataTable>
  );
}

function useProductList(): [
  ListProduct[],
  (productList: ListProduct[]) => void
] {
  const [productList, setProductList] = useState<ListProduct[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await fetchProductsForList();
      const productsForList = transformProductsForList(data);
      setProductList(productsForList);
    }
    fetchProducts();
  }, []);

  return [productList, setProductList];
}

function useColDefs(): [ColDef[], (colDefs: ColDef[]) => void] {
  const [colDefs, setColDefs] = useState<ColDef[]>([]);

  useEffect(() => {
    const fetchColDefs = async () => {
      const data = await getProductListColumns();
      setColDefs(data);
    };
    fetchColDefs();
  }, []);

  return [colDefs, setColDefs];
}

function sortProductsBy(
  colDef: ColDef,
  products: ListProduct[]
): ListProduct[] {
  if (colDef.dataType === 'string') {
    return products.sort((a, b) => {
      const aVal = a[colDef.headerName as keyof ListProduct] as string;
      const bVal = b[colDef.headerName as keyof ListProduct] as string;
      return aVal.toLocaleLowerCase().localeCompare(bVal.toLocaleLowerCase());
    });
  }
  if (colDef.dataType === 'number') {
    return products.sort((a, b) => {
      const aVal = a[colDef.headerName as keyof ListProduct] as number;
      const bVal = b[colDef.headerName as keyof ListProduct] as number;
      return aVal - bVal;
    });
  }
  return products;
}

function displayData(product: ListProduct, colDef: ColDef) {
  if (colDef.dataType === 'image') {
    return (
      <img
        src={product[colDef.headerName as keyof ListProduct] as string}
        alt={product.name}
        className='w-8 h-8 rounded-full'
      />
    );
  }
  return product[colDef.headerName as keyof ListProduct] as string;
}

async function fetchProductsForList(): Promise<ProductQueryData> {
  const productsQuery = supabase.from('products').select(`
    id,
    name,
    base_price,
    description,
    brands ( name ),
    subcategories ( 
      name,
      categories ( name )
    ),
    thumbnail,
    status,
    attributes,
    tags,
    created_at,
    updated_at
  `);

  const { data, error } = await productsQuery;

  if (error) {
    throw new Error(error.message);
  }

  return data as ProductQueryData;
}

function transformProductsForList(data: ProductQueryData): ListProduct[] {
  const productList = data.map((product) => {
    return {
      id: product.id,
      name: product?.name ?? '',
      description: product?.description ?? '',
      price: product.base_price ?? 0,
      status: product.status,
      brand: product.brands?.name ?? '',
      category: createCategoryString(product.subcategories),
      subcategory: product.subcategories?.name ?? '',
      attributes: product.attributes,
      tags: product.tags,
      created_at: product.created_at,
      updated_at: product.updated_at,
    };
  });
  return productList;
}

function createCategoryString(
  subcategory: ProductQueryData[0]['subcategories']
) {
  if (subcategory?.categories?.name) {
    return `${subcategory.categories.name} > ${subcategory.name}`;
  }
  return subcategory?.name ?? '';
}

type ProductQueryData = {
  id: string;
  name: string | null;
  description: string | null;
  base_price: number | null;
  brands: {
    name: string;
  } | null;
  subcategories: {
    name: string;
    categories: {
      name: string;
    } | null;
  } | null;
  thumbnail: string | null;
  status: string;
  attributes: string[];
  tags: string[];
  created_at: string;
  updated_at: string;
}[];

type ListProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  status: Database['public']['Tables']['product_status_types']['Row']['label'];
  brand: string;
  category: string;
  attributes: string[];
  tags: string[];
  created_at: string;
  updated_at: string;
};
