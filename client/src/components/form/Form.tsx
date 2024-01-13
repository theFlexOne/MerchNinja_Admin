import useId from '@/hooks/useId';
import { cn } from '@/utils/cn';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react';

export default function Form({
  id,
  children,
  className,
  onClose,
  devtools = false,
  onSubmit,
  methods,
  ...props
}: FormProps) {
  const formId = useId(id);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && methods.handleSubmit(onSubmit)();
  };

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
        <form
          id={formId}
          className={cn([className])}
          onSubmit={handleSubmit}
          {...props}
        >
          {children}
        </form>
      </FormProvider>
      {devtools && <DevTool control={methods.control} placement='top-left' />}
    </>
  );
}

type FormProps = Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit'> & {
  id?: string;
  children: React.ReactNode;
  onClose?: () => void;
  onSubmit?: SubmitHandler<FieldValues>;
  methods: ReturnType<typeof useForm>;
  devtools?: boolean;
};
