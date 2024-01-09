import Select from '@/components/form/Select';
import { SelectOptionType } from '@/types/app.types';
import { FullProductSet } from '@/types/models.types';
import { cn, fetchSupabaseData } from '@/utils';
import { useEffect, useState } from 'react';

const ProductSetSelect = ({
  onChange,
  className,
  ...props
}: ProductSetSelectProps) => {
  const data: Partial<FullProductSet>[] = useProductSets();
  const [value, setValue] = useState<FullProductSet | null>(null);

  const options: SelectOptionType[] = buildProductSetOptions(data);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productSetId = e.target.value;
    if (productSetId == null) {
      setValue(null);
      onChange(null);
      return;
    }
    const productSet =
      (data as FullProductSet[]).find(
        (productSet) => productSet.id.toString() === productSetId
      ) ?? null;
    onChange(productSet);
  };

  return (
    <div className={cn(['flex gap-4 items-center', className])}>
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

function useProductSets(): Partial<FullProductSet>[] {
  const [data, setData] = useState<Partial<FullProductSet>[]>([]);

  useEffect(() => {
    const fetchProductSets = async () => {
      const data = await fetchSupabaseData<Partial<FullProductSet>>(
        'product_sets',
        ['id', 'name']
      );
      setData(data);
    };
    fetchProductSets();
  }, []);

  return data;
}

function buildProductSetOptions(
  data: Partial<FullProductSet>[]
): SelectOptionType[] {
  return [
    { id: 'none', value: null, label: 'None' },
    ...(data as FullProductSet[]).map((productSet) => ({
      id: productSet.id.toString(),
      value: productSet.id.toString(),
      label: productSet.name,
    })),
  ];
}

type ProductSetSelectProps = {
  className?: string;
  onChange: (productSet: FullProductSet | null) => void;
};

export default ProductSetSelect;
