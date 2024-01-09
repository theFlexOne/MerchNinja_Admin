import { HTMLProps } from 'react';
import { cn } from '@/utils/cn';

const InputFieldWrapper = ({
  children,
  className,
}: HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        [
          'flex items-center px-2 py-1',
          'text-neutral-200 tracking-wide',
          'bg-f1-dark-field border border-f1-dark-bg/80 rounded',
          'focus-within:outline-none focus-within:border-primary-500/40 focus-within:ring-1 focus-within:ring-primary-500/40',
          'transition-colors duration-200 ease-in-out',
        ],
        className
      )}
    >
      {children}
    </div>
  );
};

export default InputFieldWrapper;
