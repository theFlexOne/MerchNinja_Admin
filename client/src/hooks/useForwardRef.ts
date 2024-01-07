import { useEffect, useRef } from 'react';

const useForwardRef = <T>(ref: React.Ref<T>): React.RefObject<T> => {
  const backupRef = useRef<T>(null);
  useEffect(() => {
    if (ref) {
      (ref as React.RefCallback<HTMLInputElement>)?.(
        backupRef.current as HTMLInputElement
      );
    }
    (ref as React.RefCallback<HTMLInputElement>)?.(
      backupRef.current as HTMLInputElement
    );
  }, [ref]);

  return backupRef;
};

export default useForwardRef;
