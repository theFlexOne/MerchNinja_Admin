import { createPortal } from 'react-dom';
import Dialog from './Dialog';

const GlobalModal = ({ open, children }: GlobalModalProps) => {
  return (
    open &&
    createPortal(
      <Dialog open={open} isModal={true}>
        {children}
      </Dialog>,
      document.body
    )
  );
};

type GlobalModalProps = {
  open: boolean;
  children: React.ReactNode;
};

export default GlobalModal;
