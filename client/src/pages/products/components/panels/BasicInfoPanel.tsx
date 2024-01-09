import TextInput from '@/components/form/TextInput';
import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import Textarea from '@/components/form/Textarea';
import { useFormContext } from 'react-hook-form';
import CurrencyInput from 'react-currency-input-field';
import { cn } from '@/utils';
import InputFieldWrapper from '@/components/form/InputFieldWrapper';

const BasicInfoPanel = () => {
  const { register } = useFormContext();

  return (
    <Panel>
      <PanelBody>
        <TextInput
          label='Product Name'
          className='w-full'
          {...register('name')}
        />
        <div>
          <PriceInput />
        </div>
        <Textarea
          label='Full Description'
          className='w-full min-h-[10rem]'
          {...register('description')}
        />
      </PanelBody>
    </Panel>
  );
};

export default BasicInfoPanel;

function PriceInput({ className }: PriceInputProps) {
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
