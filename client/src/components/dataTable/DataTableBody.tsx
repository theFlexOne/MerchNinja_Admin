import { cn } from '@/utils';
import { HTMLProps } from 'react';

export default function DataTableBody({
  className,
  children,
  ...props
}: HTMLProps<HTMLTableSectionElement>) {
  return (
    <tbody className={cn('', className)} {...props}>
      {children}
    </tbody>
  );
}
