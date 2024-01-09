import { ComponentPropsWithoutRef, forwardRef } from 'react';
import BaseTextInput from './base/BaseTextInput';

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, containerProps, ...inputProps }, ref) => {
    return (
      <div {...containerProps}>
        {label && (
          <label className='text-neutral-400 text-sm' htmlFor={inputProps.id}>
            {label}
          </label>
        )}
        <BaseTextInput ref={ref} {...inputProps} />
      </div>
    );
  }
);

type TextInputProps = ComponentPropsWithoutRef<'input'> & {
  label?: string;
  type?: TextInputType;
  containerProps?: React.HTMLProps<HTMLDivElement>;
};

type TextInputType = 'text' | 'password' | 'email';

export default TextInput;
