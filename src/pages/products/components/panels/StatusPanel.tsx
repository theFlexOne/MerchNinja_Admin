import Select from '@/components/form/Select';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

const OPTIONS = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
];

const StatusPanel = () => {
  const { setValue, register } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue('status', value, {
      shouldValidate: true,
      shouldDirty: value !== OPTIONS[0].value,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    register('status', { value: OPTIONS[0].value });
  }, [register]);

  return (
    <Panel>
      <PanelHeader>Status</PanelHeader>
      <PanelBody>
        <Select
          label='Status'
          options={OPTIONS}
          name='status'
          onChange={handleChange}
        />
      </PanelBody>
    </Panel>
  );
};

export default StatusPanel;
