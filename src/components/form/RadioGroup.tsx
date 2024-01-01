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
  return (
    <div className={`flex flex-col ${className}`} {...containerProps}>
      {label && (
        <label
          htmlFor={id}
          className='text-sm font-medium text-gray-700'
          {...labelProps}
        >
          {label}
        </label>
      )}
      <div className='flex flex-col gap-2'>
        {options.map((option) => (
          <div key={option.value} className='flex items-center gap-2'>
            <input
              type='radio'
              id={id}
              name={name}
              value={option.value}
              className='text-blue-500 border-gray-300 focus:ring-blue-500'
            />
            <label htmlFor={id} className='text-sm text-gray-700'>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
