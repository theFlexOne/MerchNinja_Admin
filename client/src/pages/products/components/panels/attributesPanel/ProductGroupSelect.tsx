import Select from '@/components/form/Select';
import useSupabaseData from '@/hooks/useSupabaseData';
import { SelectOption } from '@/types/app.types';
import { ProductGroup } from '@/types/models.types';
import { HTMLProps, forwardRef } from 'react';

const ProductGroupSelect = forwardRef(
  (
    { onChange, value, ...props }: ProductGroupSelectProps,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    const { data } = useSupabaseData('productGroups', ['id', 'name']);

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
        <Select
          ref={ref}
          className='grow'
          options={options}
          onChange={handleChange}
          value={'' + value}
          {...props}
        />
      </div>
    );
  }
);

type ProductGroupSelectProps = Omit<
  HTMLProps<HTMLSelectElement>,
  'onChange'
> & {
  onChange: (productGroup: ProductGroup | null) => void;
};

export default ProductGroupSelect;
