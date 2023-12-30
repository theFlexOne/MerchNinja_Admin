import useId from '@/hooks/useId';
import cn from '@/utils/cn';
import { FormProvider, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import React, { useEffect } from 'react';

export default function Form({
  id,
  children,
  className,
  onClose,
  devtools = false,
  ...props
}: FormProps) {
  const formId = useId(id);

  const methods = useForm<Record<string, unknown>>();

  useEffect(() => {
    if (!onClose) return;
    window.addEventListener('beforeunload', () => {
      onClose();
    });
    return () => {
      window.removeEventListener('beforeunload', () => {});
    };
  }, [onClose]);

  return (
    <>
      <FormProvider {...methods}>
        <form id={formId} className={cn([className])} {...props}>
          {children}
        </form>
      </FormProvider>
      {devtools && <DevTool control={methods.control} />}
    </>
  );
}

type FormProps = Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit'> & {
  id?: string;
  children: React.ReactNode;
  onClose?: () => void;
  onSubmit?: (data: Record<string, unknown>) => void;
  devtools?: boolean;
};
