import { cn } from '@/utils';
import { HTMLProps } from 'react';

export default function DataTable({
  className,
  children,
  ...props
}: HTMLProps<HTMLTableElement>) {
  return (
    <table className={cn('table-auto w-full', className)} {...props}>
      {children}
    </table>
  );
}
