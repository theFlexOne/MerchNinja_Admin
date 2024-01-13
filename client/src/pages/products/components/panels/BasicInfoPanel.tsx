import TextInput from '@/components/form/TextInput';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import Textarea from '@/components/form/Textarea';
import { useFormContext } from 'react-hook-form';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import CurrencyInput from '@/components/form/CurrencyInput';

const BasicInfoPanel = () => {
  const { register } = useFormContext();

  const priceProps = register('price', {
    setValueAs: (v) => {
      return v.replace(/[^0-9.]/g, '');
    },
    required: true,
  });

  return (
    <Panel>
      <PanelHeader>Basic Info</PanelHeader>
      <PanelBody>
        <TextInput
          label='Product Name'
          className='w-full'
          {...register('name', { required: true })}
        />
        <CurrencyInput label='Price' {...priceProps} />
        <Textarea
          label='Full Description'
          className='w-full min-h-[10rem]'
          {...register('description')}
        />
      </PanelBody>
    </Panel>
  );
};

export default BasicInfoPanel;
