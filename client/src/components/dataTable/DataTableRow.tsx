import { cn } from '@/utils';
import { HTMLProps } from 'react';

export default function DataTableRow({
  className,
  children,
  ...props
}: HTMLProps<HTMLTableRowElement>) {
  return (
    <tr className={cn('', className)} {...props}>
      {children}
    </tr>
  );
}
