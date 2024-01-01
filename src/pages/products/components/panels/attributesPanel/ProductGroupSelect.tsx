import Select from '@/components/form/Select';
import { SelectOption } from '@/types/app.types';
import { useFormContext } from 'react-hook-form';

export default function ProductGroupSelect({
  options,
  onChange,
}: {
  options: SelectOption[];
  onChange?: (productGroupName: string) => void;
}) {
  const { register, getValues } = useFormContext();

  options = [
    {
      label: 'None',
      value: '',
    },
    ...options,
  ];

  const { onChange: onChangeForm, ...rest } = register('productGroup');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
    onChangeForm(e);
  };

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm text-neutral-400'>Product Group</label>
      <div className='flex gap-2'>
        <Select
          className='grow'
          value={getValues('productGroup')}
          options={options}
          onChange={handleChange}
          {...rest}
        />
        <button
          type='button'
          className='text-primary-500/80 text-xs min-w-fit px-2 py-1 hover:bg-neutral-100/20 rounded-md'
        >
          New Group
        </button>
      </div>
    </div>
  );
}
