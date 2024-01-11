import { cn } from '@/utils';
import { HTMLProps } from 'react';

export default function Tab({ name, active, className, ...props }: TabProps) {
  return (
    <button
      key={name}
      type='button'
      className={cn([
        'grow',
        'py-2 px-4 text-sm font-medium',
        'items-center',
        'transition-colors duration-200 ease-in-out',
        'border-b-2 border-transparent',
        {
          'text-primary/70 border-b-primary/60': active,
        },
        className,
      ])}
      {...props}
    >
      {name}
    </button>
  );
}

type TabProps = Omit<HTMLProps<HTMLButtonElement>, 'type'> & {
  name: string;
  active?: boolean;
};
