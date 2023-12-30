import { useForm } from '@/hooks/useForm';
import cn from '@/utils/cn';
import React, { createContext } from 'react';

export const CheckboxGroupContext =
  createContext<CheckboxGroupContextValue | null>(null);

const CheckboxGroup = ({ children, className, name }: CheckboxGroupProps) => {
  const update = useCheckboxGroup(name);

  className = cn(['flex flex-col gap-2', className]);

  return (
    <CheckboxGroupContext.Provider value={{ update }}>
      <div className={className}>{children}</div>
    </CheckboxGroupContext.Provider>
  );
};

const useCheckboxGroup = (name: string) => {
  const { updateFormField } = useForm(name, []);
  return (value: string) => updateFormField(value);
};

type CheckboxGroupProps = {
  name: string;
} & React.HTMLProps<HTMLDivElement>;

type CheckboxGroupContextValue = {
  update: (value: string) => void;
};

export default CheckboxGroup;
