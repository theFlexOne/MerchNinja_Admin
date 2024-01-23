import { cn } from '@/utils';
import { HTMLProps } from 'react';

export default function DataTableCell({
  className,
  children,
  header = false,
  ...props
}: HTMLProps<HTMLTableCellElement> & {
  header?: boolean;
}) {
  className = cn('px-4 py-2', className);

  return header ? (
    <th className={className} {...props}>
      <div className='flex items-center justify-center'>{children}</div>
    </th>
  ) : (
    <td className={className} {...props}>
      <div className='flex items-center justify-center'>{children}</div>
    </td>
  );
}
