import useId from '@/hooks/useId';

interface RadioGroupProps {
  id?: string;
  options: Array<{ label: string; value: string | number }>;
  name: string;
  label?: string;
  className?: string;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  labelProps?: React.HTMLProps<HTMLLabelElement>;
}

const RadioGroup = ({
  id,
  options,
  name,
  label,
  className,
  containerProps,
  labelProps,
}: RadioGroupProps) => {
  id = useId(id);
  return <div></div>;
};

export default RadioGroup;
