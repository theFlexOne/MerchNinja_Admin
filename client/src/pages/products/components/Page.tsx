import { cn } from '@/utils';
import { HTMLProps } from 'react';

export default function Page({
  children,
  className,
  ...rest
}: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn('grow flex flex-col gap-6 items-center', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
