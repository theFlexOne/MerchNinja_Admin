import { IoAddSharp as AddIcon } from 'react-icons/io5';
import { useState } from 'react';
import InputFieldWrapper from './InputFieldWrapper';
import { cn } from '@/utils';

export default function TagInput({
  handleAddTag,
}: {
  handleAddTag: (tagValue: string) => void;
}) {
  const [tagValue, setTagValue] = useState<string>('');
  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleAddTag(tagValue);
    }
  }

  return (
    <InputFieldWrapper className='flex relative'>
      <input
        name='tags'
        type='text'
        id='tags'
        className='bg-transparent border-none outline-none placeholder-neutral-200 grow px-2 py-1 text-sm placeholder:text-neutral-400/70'
        value={tagValue}
        onChange={(e) => setTagValue(e.target.value)}
        onKeyUp={handleKeyUp}
        placeholder='Add a tag'
      />
      <button
        type='button'
        disabled={!tagValue}
        className={cn([
          'bg-neutral-100/10 text-primary text-lg p-2 ml-auto rounded',
          'disabled:text-neutral-400/70 disabled:bg-transparent',
          'hover:bg-neutral-100/20',
        ])}
        onClick={() => handleAddTag(tagValue)}
      >
        <AddIcon />
      </button>
    </InputFieldWrapper>
  );
}
