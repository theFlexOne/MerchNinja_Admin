import { NumericFormat, OnValueChange } from 'react-number-format';
import useId from '@/hooks/useId';
import cn from '@/utils/cn';
import { useFormContext } from 'react-hook-form';
import { ChangeEvent, useEffect } from 'react';

const PriceInput = ({
  id,
  name,
  className = '',
  label,
  onChange,
  onBlur,
  disabled = false,
  containerProps = {},
  ...inputProps
}: PriceInputProps) => {
  id = useId(id);

  const handleValueChange = (e: any) => {
    console.log(e);
    onChange?.(e);
  };

  className = cn([
    'w-[30ch]',
    'text-black bg-white tracking-wide font-medium',
    'border-2 border-gray-500 rounded-md px-2 py-1',
    'focus-within:outline-none focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500',
    'transition-colors duration-200 ease-in-out',
    {
      'outline-none border-primary-500 ring-1 ring-primary-500': disabled,
    },
    className,
  ]);

  return (
    <div {...containerProps}>
      {label && <label htmlFor={id}>{label}</label>}
      <NumericFormat
        onValueChange={handleValueChange}
        onBlur={onBlur}
        name={name}
        className={className}
        thousandSeparator={true}
        prefix={'$'}
        placeholder={'$0.00'}
        allowNegative={false}
        decimalScale={2}
        fixedDecimalScale={true}
        {...inputProps}
      />
    </div>
  );
};

type PriceInputProps = {
  id?: string;
  className?: string;
  name: string;
  label?: string;
  type?: 'text' | 'tel' | 'password' | undefined;
  disabled?: boolean;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export default PriceInput;
