import Button from '@/components/Button';
import TextInput from '@/components/form/TextInput';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import { useFieldArray, useFormContext } from 'react-hook-form';

const MetadataPanel = () => {
  const { control } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: 'metadata',
  });

  const metadataList: FormField<MetadataItemType>[] =
    fields as FormField<MetadataItemType>[];

  return (
    <Panel>
      <PanelHeader className='relative'>More Info</PanelHeader>
      <PanelBody>
        <div className='flex flex-col gap-4'>
          <Button
            className='w-auto self-center'
            onClick={() => append({ title: '', description: '' })}
          >
            Add Metadata
          </Button>
          {metadataList.map((field, index) => (
            <MetadataSectionInputs key={field.id} index={index} />
          ))}
        </div>
      </PanelBody>
    </Panel>
  );
};

export default MetadataPanel;

function MetadataSectionInputs({ index }: { index: number }) {
  const { register, control } = useFormContext();
  const { remove } = useFieldArray({
    control,
    name: 'metadata',
  });

  return (
    <div className='flex gap-4'>
      <TextInput
        label='Title'
        {...register(`metadata.${index}.title`, { required: true })}
      />
      <TextInput
        label='Description'
        {...register(`metadata.${index}.description`, { required: true })}
      />
      <button
        type='button'
        className='border rounded px-2 py-1 self-end mb-2'
        onClick={() => remove(index)}
      >
        Remove
      </button>
    </div>
  );
}

type MetadataItemType = {
  title: string;
  description: string;
};

export type FormField<T> = T & {
  id: string;
};
