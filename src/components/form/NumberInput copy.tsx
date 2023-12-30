import useId from '@/hooks/useId';
import cn from '@/utils/cn';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

const NumberInput = ({
  id,
  name,
  className = '',
  label,
  disabled = false,
  maxLength = 10,
  containerProps = {},
  ...inputProps
}: NumberInputProps) => {
  id = useId(id);
  const { register, setValue, getValues } = useFormContext();

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

  const handleValueChange = ({ floatValue }: { floatValue?: number }) => {
    if (floatValue === undefined) floatValue = 0;
    setValue(name, floatValue, { shouldDirty: true });
  };

  const handleBlur = () => {
    setValue(name, getValues(name), { shouldTouch: true });
  };

  useEffect(() => {
    register(name);
  }, [name, register]);

  return (
    <div {...containerProps}>
      {label && <label htmlFor={id}>{label}</label>}
      <NumericFormat
        id={id}
        value={getValues(name)}
        onValueChange={handleValueChange}
        onBlur={handleBlur}
        name={name}
        className={className}
        maxLength={maxLength}
        {...inputProps}
      />
    </div>
  );
};

type NumberInputProps = {
  id?: string;
  className?: string;
  name: string;
  label?: string;
  prefix?: string;
  allowNegative?: boolean;
  placeholder?: string;
  thousandSeparator?: boolean;
  disabled?: boolean;
  maxLength?: number;
  containerProps?: React.HTMLProps<HTMLDivElement>;
};

export default NumberInput;
