import TextInput from '@/components/form/TextInput';
import cn from '@/utils/cn';
import { useState } from 'react';

export default function AttributeInputs({
  onAddAttribute,
}: {
  onAddAttribute: (name: string, value: string) => boolean;
}) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const handleAddAttribute = () => {
    if (name && value) {
      if (!onAddAttribute(name, value)) return;
      setName('');
      setValue('');
    }
  };

  const handleChange =
    (key: 'name' | 'value') => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (key === 'name') setName(e.target.value);
      if (key === 'value') setValue(e.target.value);
    };

  return (
    <div className='subgrid-col-full gap-4'>
      <div className='subgrid-col-full'>
        <TextInput
          type='text'
          placeholder='Name'
          className='text-sm'
          value={name}
          onChange={handleChange('name')}
          containerProps={{ className: 'w-auto' }}
        />
        <TextInput
          type='text'
          placeholder='Value'
          className='text-sm'
          value={value}
          onChange={handleChange('value')}
          containerProps={{ className: 'w-auto' }}
        />
        <button
          type='button'
          className={cn([
            'text-primary-500/80 text-xs',
            'min-w-fit px-2 py-1 rounded-md',
            'hover:bg-neutral-100/20',
            'disabled:text-neutral-400 disabled:cursor-not-allowed',
          ])}
          onClick={handleAddAttribute}
          disabled={!name || !value}
        >
          Add
        </button>
      </div>
    </div>
  );
}
