import Select from '@/components/form/Select';
import { SelectOption } from '@/types/app.types';
import { ProductGroup } from '@/types/models.types';
import { fetchSupabaseData } from '@/utils';
import { useEffect, useState } from 'react';

const ProductGroupSelect = ({
  onChange,
  ...props
}: ProductGroupSelectProps) => {
  const data: Partial<ProductGroup>[] = useProductGroups();
  const [value, setValue] = useState<ProductGroup | null>(null);

  const options: SelectOption[] = buildProductGroupOptions(data);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productGroupId = e.target.value;
    if (productGroupId == null) {
      setValue(null);
      onChange(null);
      return;
    }
    const productGroup =
      (data as ProductGroup[]).find(
        (productGroup) => productGroup.id.toString() === productGroupId
      ) ?? null;
    onChange(productGroup);
  };

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm text-neutral-400'>Product Group</label>
      <Select
        className='grow'
        options={options}
        onChange={handleChange}
        value={'' + value}
        {...props}
      />
    </div>
  );
};

function useProductGroups(): Partial<ProductGroup>[] {
  const [data, setData] = useState<Partial<ProductGroup>[]>([]);

  useEffect(() => {
    const fetchProductGroups = async () => {
      const data = await fetchSupabaseData<Partial<ProductGroup>>(
        'product_groups',
        ['id', 'name']
      );
      setData(data);
    };
    fetchProductGroups();
  }, []);

  return data;
}

function buildProductGroupOptions(
  data: Partial<ProductGroup>[]
): SelectOption[] {
  return [
    { id: 'none', value: null, label: 'None' },
    ...(data as ProductGroup[]).map((productGroup) => ({
      id: productGroup.id.toString(),
      value: productGroup.id.toString(),
      label: productGroup.name,
    })),
  ];
}

type ProductGroupSelectProps = {
  className?: string;
  onChange: (productGroup: ProductGroup | null) => void;
};

export default ProductGroupSelect;
