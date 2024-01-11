import InputFieldWrapper from '@/components/form/InputFieldWrapper';
import { cn } from '@/utils';
import CurrencyInput from 'react-currency-input-field';
import { useFormContext } from 'react-hook-form';

export default function PriceInput({ className }: PriceInputProps) {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor='basePrice' className='text-neutral-400 text-sm'>
        Price
      </label>
      <InputFieldWrapper>
        <CurrencyInput
          id='basePrice'
          className={cn([
            'w-full',
            'bg-transparent border-none outline-none',
            'text-lg',
            'px-2 py-1',
            'disabled:outline-none disabled:border-neutral-700 disabled:ring-1 disabled:ring-neutral-700 disabled:bg-neutral-800',
            className,
          ])}
          placeholder='$0.00'
          prefix='$'
          decimalsLimit={2}
          {...register('basePrice')}
        />
      </InputFieldWrapper>
    </div>
  );
}

type PriceInputProps = React.HTMLProps<HTMLInputElement>;
