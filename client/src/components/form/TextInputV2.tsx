import { HTMLProps, forwardRef } from 'react';
import BaseTextInput from './base/BaseTextInput';

const TextInputV2 = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, containerProps, ...inputProps }, ref) => {
    return (
      <div {...containerProps}>
        {label && (
          <label className='text-neutral-400 text-sm' htmlFor={inputProps.id}>
            {label}
          </label>
        )}
        {/* @ts-expect-error forwardRef */}
        <BaseTextInput ref={ref} {...inputProps} />
      </div>
    );
  }
);

type TextInputProps = HTMLProps<HTMLInputElement> & {
  label?: string;
  type?: TextInputType;
  containerProps?: React.HTMLProps<HTMLDivElement>;
};

type TextInputType = 'text' | 'password' | 'email';

export default TextInputV2;
