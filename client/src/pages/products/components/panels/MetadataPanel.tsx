import Button from '@/components/Button';
import TextInput from '@/components/form/TextInput';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import PanelHeader from '@/components/layout/panel/PanelHeader';
import { useFieldArray, useFormContext } from 'react-hook-form';

const MetadataPanel = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'metadata',
  });

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
          {fields.map((field, index) => (
            <MetadataSectionInputs
              key={field.id}
              name={`metadata.${index}`}
              remove={() => remove(index)}
            />
          ))}
        </div>
      </PanelBody>
    </Panel>
  );
};

export default MetadataPanel;

function MetadataSectionInputs({
  remove,
  name,
}: {
  remove: () => void;
  name: string;
}) {
  const { register } = useFormContext();

  return (
    <div className='flex gap-4'>
      <TextInput
        label='Title'
        {...register(`${name}.title`, { required: true })}
      />
      <TextInput
        label='Description'
        {...register(`${name}.description`, { required: true })}
      />
      <button
        type='button'
        className='border rounded px-2 py-1 self-end mb-2'
        onClick={remove}
      >
        Remove
      </button>
    </div>
  );
}

export type FormField<T> = T & {
  id: string;
};
