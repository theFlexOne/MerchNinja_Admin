import TextInput from '@/components/form/TextInput';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import Textarea from '@/components/form/Textarea';
import { useFormContext } from 'react-hook-form';
import PanelHeader from '@/components/layout/panel/PanelHeader';

const BasicInfoPanel = () => {
  const { register } = useFormContext();

  return (
    <Panel>
      <PanelHeader>Basic Info</PanelHeader>
      <PanelBody>
        <TextInput
          label='Product Name'
          className='w-full'
          {...register('name')}
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
