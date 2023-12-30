import cn from '@/utils/cn';
import useId from '@/hooks/useId';
import React, { forwardRef } from 'react';

const NumberInput = forwardRef(
  (
    {
      id,
      disabled = false,
      label,
      className,
      onChange,
      onBlur,
      containerProps = {},
      decimalLength,
      fixedDecimalLength,
      allowNegative,
      prefix,
      ...inputProps
    }: NumberInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    id = useId(id);
    containerProps ||= {};

    className = cn([
      'w-[30ch]',
      'text-black bg-white tracking-wide font-medium',
      'border-2 border-gray-500 rounded-md px-2 py-1',
      'focus-within:outline-none focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500',
      'transition-colors duration-200 ease-in-out',
      {
        'outline-none border-gray-500 ring-1 ring-gray-500 bg-gray-300':
          disabled,
      },
      className,
    ]);

    containerProps.className = cn([
      'flex flex-col gap-2',
      containerProps?.className ?? '',
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let { value } = e.target;
      value = onChangeFormat(value, {
        decimalLength,
        allowNegative,
        prefix,
      });
      e.target.value = value;
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      let { value } = e.target;
      value = onBlurFormat(value, { decimalLength, fixedDecimalLength });
      e.target.value = value;
      onBlur?.(e);
    };

    return (
      <div {...containerProps}>
        {label && (
          <label className={cn(['text-gray-400 text-sm'])} htmlFor={id}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={className}
          type={'number'}
          id={id}
          onChange={handleChange}
          onBlur={handleBlur}
          {...inputProps}
        />
      </div>
    );
  }
);

const onChangeFormat = (
  value: string,
  {
    decimalLength,
    allowNegative = false,
    prefix = '',
  }: {
    decimalLength?: number;
    allowNegative?: boolean;
    prefix?: string;
  }
) => {
  let result = value;

  if (prefix) {
    result = prefix + result;
  }
  if (decimalLength) {
    const [integer, decimal] = result.split('.');
    if (decimal) {
      result = integer + '.' + decimal.slice(0, decimalLength);
    }
  }
  if (!allowNegative) {
    result = Math.abs(parseFloat(result)).toString();
  }
  return result;
};

const onBlurFormat = (
  value: string,
  {
    decimalLength,
    fixedDecimalLength = false,
  }: {
    decimalLength?: number;
    fixedDecimalLength?: boolean;
  }
) => {
  let result = value;
  if (fixedDecimalLength && decimalLength) {
    const [integer, decimal] = result.split('.');
    if (decimal?.length < decimalLength) {
      result = integer + '.' + decimal.padEnd(decimalLength, '0');
    }
  }
  return result;
};

type NumberInputProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  decimalLength?: number;
  fixedDecimalLength?: boolean;
  allowNegative?: boolean;
  prefix?: string;
};

export default NumberInput;
