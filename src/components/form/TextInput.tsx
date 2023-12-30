import cn from '@/utils/cn';
import useId from '@/hooks/useId';
import React, { forwardRef } from 'react';
import { FormControlElementBase } from '@/lib/f1_form_lib/types';
import InputFieldWrapper from './InputFieldWrapper';

const TextInput = forwardRef(
  (
    {
      id,
      disabled = false,
      label,
      className,
      type = 'text',
      defaultValue,
      name,
      containerProps = {},
      ...inputProps
    }: TextInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    id = useId(id);

    className = cn([
      'bg-transparent border-none outline-none',
      'text-lg',
      'w-[30ch] px-2 py-1',
      {
        'outline-none border-neutral-700 ring-1 ring-neutral-700 bg-neutral-800':
          disabled,
      },
      className,
    ]);

    containerProps.className = cn([
      'flex flex-col gap-2',
      containerProps?.className ?? '',
    ]);

    return (
      <div {...containerProps}>
        {label && (
          <label className={cn(['text-gray-400 text-sm'])} htmlFor={id}>
            {label}
          </label>
        )}
        <InputFieldWrapper>
          <input
            ref={ref}
            className={className}
            type={type}
            id={id}
            name={name}
            disabled={disabled}
            defaultValue={defaultValue}
            {...inputProps}
          />
        </InputFieldWrapper>
      </div>
    );
  }
);

type TextInputProps = FormControlElementBase<HTMLInputElement> & {
  label?: string;
  type?: TextInputType;
  containerProps?: React.HTMLProps<HTMLDivElement>;
};

export type TextInputType = 'text' | 'password' | 'email';

export default TextInput;
