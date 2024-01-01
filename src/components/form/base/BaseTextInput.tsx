import cn from '@/utils/cn';
import { ForwardedRef, forwardRef } from 'react';
import InputFieldWrapper from '../InputFieldWrapper';

type BaseTextInputProps = React.HTMLProps<HTMLInputElement>;

const BaseTextInput = forwardRef<HTMLInputElement, BaseTextInputProps>(
  (
    { className, ...props }: BaseTextInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputFieldWrapper>
        <input
          ref={ref}
          className={cn([
            'aboslute inset-0 w-full h-full',
            'bg-transparent border-none outline-none',
            'text-lg',
            'px-2 py-1',
            'disabled:outline-none disabled:border-neutral-700 disabled:ring-1 disabled:ring-neutral-700 disabled:bg-neutral-800',
            className,
          ])}
          {...props}
        />
      </InputFieldWrapper>
    );
  }
);

export default BaseTextInput;
