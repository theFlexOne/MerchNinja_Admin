import { useContext } from 'react';
import { CheckboxGroupContext } from './CheckboxGroup';

const useCheckbox = (value: string) => {
  const ctx = useContext(CheckboxGroupContext);

  if (!ctx) {
    throw new Error('CheckboxGroupContext is not defined');
  }

  const { update } = ctx;
  return () => update(value);
};

export default useCheckbox;
