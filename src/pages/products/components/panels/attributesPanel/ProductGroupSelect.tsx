import Select from '@/components/form/Select';
import useSupaBaseData from '@/hooks/useSupaBaseData';
import { SelectOption } from '@/types/app.types';
import { ProductGroup } from '@/types/models.types';

export default function ProductGroupSelect({
  onChange,
}: {
  onChange: (productGroup: ProductGroup | null) => void;
}) {
  const { data } = useSupaBaseData('productGroups');

  const options: SelectOption[] = [
    { id: 'none', value: '', label: 'None' },
    ...(data as ProductGroup[]).map((productGroup) => ({
      id: productGroup.id.toString(),
      value: productGroup.id.toString(),
      label: productGroup.name,
    })),
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productGroupId = e.target.value;
    const productGroup = (data as ProductGroup[]).find(
      (productGroup) => productGroup.id.toString() === productGroupId
    );
    console.log('productGroup', productGroup);

    onChange(productGroup ?? null);
  };

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm text-neutral-400'>Product Group</label>
      <Select className='grow' options={options} onChange={handleChange} />
    </div>
  );
}
