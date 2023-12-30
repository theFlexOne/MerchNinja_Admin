import useId from '@/hooks/useId';
import cn from '@/utils/cn';
import { forwardRef } from 'react';
import InputFieldWrapper from './InputFieldWrapper';

const Textarea = forwardRef(
  (
    {
      id,
      name,
      label,
      className = '',
      onChange,
      onBlur,
    }: {
      id?: string;
      name: string;
      label?: string;
      className?: string;
      onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
      onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    },
    ref: React.Ref<HTMLTextAreaElement>
  ) => {
    id = useId(id);

    return (
      <div className='flex flex-col gap-1 grow'>
        {label && (
          <label className={cn(['text-gray-400 text-sm'])} htmlFor={id}>
            {label}
          </label>
        )}
        <InputFieldWrapper>
          <textarea
            ref={ref}
            id={id}
            name={name}
            className={cn([
              'bg-transparent border-none outline-none',
              'px-2 py-1 w-[30ch] min-h-[5rem]',
              className,
            ])}
            onChange={onChange}
            onBlur={onBlur}
          />
        </InputFieldWrapper>
      </div>
    );
  }
);

export default Textarea;
