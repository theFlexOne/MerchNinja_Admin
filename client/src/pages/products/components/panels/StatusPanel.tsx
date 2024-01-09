import Select from '@/components/form/Select';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { SelectOptionType } from '@/types/app.types';
import { fetchSupabaseData } from '@/utils';
import { FullStatusType } from '@/types/models.types';

export default function StatusPanel() {
  return (
    <Panel>
      <PanelHeader>Status</PanelHeader>
      <PanelBody>
        <StatusSelect />
      </PanelBody>
    </Panel>
  );
}

function StatusSelect() {
  const { register } = useFormContext();
  const [options, setOptions] = useState<SelectOptionType[]>([]);

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
      setOptions(options);
    }

    fetchOptions();
  }, [register]);

  return <Select options={options} onChange={onChange} {...props} />;
}
