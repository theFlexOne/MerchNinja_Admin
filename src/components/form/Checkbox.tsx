import React, { forwardRef, useEffect, useRef, useState } from 'react';
import useForwardRef from '@/hooks/useForwardRef';
import cn from '@/utils/cn';

type CheckboxProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
  defaultChecked?: boolean;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  containerProps?: React.HTMLProps<HTMLDivElement>;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      name,
      onChange,
      onBlur,
      defaultChecked = false,
      label,
      className = '',
      children,
      containerProps = {},
    }: CheckboxProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);
    const customInputRef = useRef<HTMLDivElement>(null);

    const hiddenInputRef = useForwardRef(ref);

    const handleClick = () => {
      setIsChecked((prev) => !prev);
      hiddenInputRef.current?.click();
      hiddenInputRef.current?.focus();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked);
      onChange?.(e);
    };

    useEffect(() => {
      const hiddenInput = hiddenInputRef.current;
      setIsChecked(hiddenInput?.checked ?? false);
    }, [hiddenInputRef]);

    return (
      <>
        <div className={cn(['flex gap-4', containerProps?.className ?? ''])}>
          {(label || children) && (
            <label onClick={handleClick}>{label ?? children}</label>
          )}
          <div
            ref={customInputRef}
            tabIndex={0}
            className={cn([
              'h-6 aspect-square border rounded-md border-amber-400/30 cursor-pointer ',
              'focus:ring-1 focus:ring-white focus:outline-none',
              isChecked ? 'bg-amber-400/30' : 'bg-gray-900/30',
              className,
            ])}
            onClick={handleClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar')
                handleClick();
            }}
          />
          <input
            type='checkbox'
            name={name}
            ref={hiddenInputRef}
            className='absolute opacity-0 w-0 h-0'
            onChange={handleChange}
            onFocus={() => customInputRef.current?.focus()}
            onBlur={onBlur}
            tabIndex={-1}
          />
        </div>
      </>
    );
  }
);

export default Checkbox;
