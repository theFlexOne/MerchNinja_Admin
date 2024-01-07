import { cn } from '@/utils/cn';
import { forwardRef } from 'react';

const PanelBody = forwardRef<HTMLDivElement, PanelBodyProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-4 flex flex-col gap-4', className)}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

interface PanelBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export default PanelBody;
