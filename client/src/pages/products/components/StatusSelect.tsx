import Select from '@/components/form/Select';
import { SelectOptionType } from '@/types/app.types';
import { FullStatusType } from '@/types/models.types';
import { fetchSupabaseData } from '@/utils';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function StatusSelect() {
  const { register } = useFormContext();
  const [statusOptions, setStatusOptions] = useState<SelectOptionType[]>([]);

  const { onChange, ...props } = register('status');

  useEffect(() => {
    async function fetchOptions() {
      const data: FullStatusType[] = await fetchSupabaseData<FullStatusType>(
        'product_status_types',
        ['name', 'label']
      );
      const options: SelectOptionType[] = data.map((status) => ({
        id: status.name,
        label: status.label,
        value: status.name,
      }));
      setStatusOptions(options);
    }

    fetchOptions();
  }, [register]);

  return (
    !!statusOptions.length && (
      <Select options={statusOptions} onChange={onChange} {...props} />
    )
  );
}
