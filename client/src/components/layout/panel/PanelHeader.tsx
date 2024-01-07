import { cn } from '@/utils/cn';
import { forwardRef } from 'react';

const PanelHeader = forwardRef<HTMLDivElement, PanelHeaderProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn([
          'px-4 flex items-center min-h-[3rem] border-b border-neutral-600/70',
          className,
        ])}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

interface PanelHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default PanelHeader;
