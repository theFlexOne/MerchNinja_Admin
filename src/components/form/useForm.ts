import { NewProduct } from '@/types/types';
import { useEffect, useRef, useState } from 'react';
import { FieldValues, useForm as useReactHookForm } from 'react-hook-form';

const useForm = <T extends FieldValues>(
  id: string,
  {
    defaultValues = {} as T,
    delay = 2000,
  }: { defaultValues?: T; delay?: number }
) => {
  const [isSaved, setIsSaved] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const methods = useReactHookForm<NewProduct>({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    const savedData = localStorage.getItem(id);
    if (savedData) {
      methods.reset(JSON.parse(savedData));
    }
  }, [id, methods]);

  useEffect(() => {
    const sub = methods.watch(() => {
      setIsSaved(false);
    });
    return () => {
      sub.unsubscribe();
    };
  }, [methods]);

  useEffect(() => {
    if (isSaved) return;
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      console.log('saving');
      localStorage.setItem(id, JSON.stringify(methods.getValues()));
      setIsSaved(true);
    }, delay);

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
    };
  }, [delay, isSaved, methods, id]);

  return methods && { methods, saved: isSaved };
};

// type UseFormReturn<T extends FieldValues> = {
//   methods: NativeUseFormReturn<T>;
//   saved: boolean;
// };

export default useForm;
