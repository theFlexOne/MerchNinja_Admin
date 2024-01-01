import cn from '@/utils/cn';
import useId from '@/hooks/useId';
import React, { HTMLProps, forwardRef } from 'react';
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
      'px-2 py-1',
      {
        'outline-none border-neutral-700 ring-1 ring-neutral-700 bg-neutral-800':
          disabled,
      },
      className,
    ]);

    containerProps.className = cn([
      'w-[30ch]',
      'flex flex-col gap-2',
      containerProps?.className ?? '',
    ]);

    return (
      <div {...containerProps}>
        {label && (
          <label className={cn(['text-neutral-400 text-sm'])} htmlFor={id}>
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

type TextInputProps = HTMLProps<HTMLInputElement> & {
  label?: string;
  type?: TextInputType;
  containerProps?: React.HTMLProps<HTMLDivElement>;
};

export type TextInputType = 'text' | 'password' | 'email';

export default TextInput;
