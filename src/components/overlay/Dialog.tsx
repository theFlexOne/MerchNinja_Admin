import useForwardRef from '@/hooks/useForwardRef';
import { HTMLProps, forwardRef, useEffect } from 'react';

const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ isModal, open, children }, forwardedRef) => {
    const ref = useForwardRef(forwardedRef);

    useEffect(() => {
      if (!ref.current) return;
      if (!open) ref.current.close();
      if (isModal) ref.current.showModal();
      ref.current.show();
    }, [open, isModal, ref]);

    return <dialog ref={ref}>{children}</dialog>;
  }
);

type DialogProps = HTMLProps<HTMLDialogElement> & {
  isModal?: boolean;
};

export default Dialog;
