import TextInput from '@/components/form/TextInput';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import Textarea from '@/components/form/Textarea';
import { useFormContext } from 'react-hook-form';

const BasicInfoPanel = () => {
  const { register } = useFormContext();

  return (
    <Panel>
      <PanelBody>
        <TextInput
          label='Product Name'
          className='w-full'
          {...register('name')}
        />
        <Textarea
          label='Brief Description'
          className='w-full'
          {...register('shortDescription')}
        />
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
