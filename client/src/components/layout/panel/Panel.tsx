import cn from '@/utils/cn';
import { HTMLAttributes, createElement, forwardRef } from 'react';

const Panel = forwardRef<HTMLElement, PanelProps>(
  ({ children, className = '', as = 'div', ...props }, ref) => {
    return createElement(
      as,
      {
        className: cn([
          'border-neutral-700 border rounded bg-f1-dark-panel',
          className,
        ]),
        ref,
        ...props,
      },
      children
    );
  }
);

type PanelProps = HTMLAttributes<HTMLElement> & {
  as?:
    | 'div'
    | 'header'
    | 'footer'
    | 'section'
    | 'article'
    | 'aside'
    | 'main'
    | 'nav'
    | 'form'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | React.ComponentType<React.ComponentProps<any>>;
};

export default Panel;
