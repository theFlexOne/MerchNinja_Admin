import CurrencyInputField from 'react-currency-input-field';
import InputFieldWrapper from './InputFieldWrapper';
import { ChangeEvent, forwardRef } from 'react';

const CurrencyInput = forwardRef(
  (
    {
      label,
      onChange,
      className,
      ...props
    }: {
      label: string;
      onChange: (e: ChangeEvent<HTMLInputElement>) => void;
      defaultValue?: number;
      className?: string;
    },
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    function handleValueChange(value: string | undefined) {
      console.log(value);
      onChange({
        target: {
          value: value,
        },
      } as ChangeEvent<HTMLInputElement>);
    }

    return (
      <div className={className}>
        <label className='text-neutral-400 text-sm'>{label}</label>
        <InputFieldWrapper>
          <CurrencyInputField
            ref={ref}
            className='w-full bg-transparent border-none focus:ring-0'
            onValueChange={handleValueChange}
            prefix='$'
            {...props}
          />
        </InputFieldWrapper>
      </div>
    );
  }
);

export default CurrencyInput;
