import { cn } from '@/utils';
import { HTMLProps } from 'react';

export default function DataTableHeader({
  className,
  children,
  ...props
}: HTMLProps<HTMLTableSectionElement>) {
  return (
    <thead className={cn('', className)} {...props}>
      {children}
    </thead>
  );
}
