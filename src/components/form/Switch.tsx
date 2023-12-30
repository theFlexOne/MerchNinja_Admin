import useId from '@/hooks/useId';
import cn from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface SwitchProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'type'
  > {
  name: string;
}

const Switch = ({
  id,
  className = '',
  name,
  checked: prechecked = false,
  ...rest
}: SwitchProps) => {
  id = useId(id);
  const [checked, setChecked] = useState(prechecked);
  const inputElRef = useRef<HTMLInputElement>(null);

  const { register, setValue } = useFormContext();

  className = cn([
    'rounded-full bg-gray-300 aspect-[1.5] relative cursor-pointer p-px',
    checked && 'bg-primary-500',
    'transition-all duration-200 ease-in-out transform',
    className,
    'w-8',
  ]);

  const handleChange = () => {
    setChecked(!checked);
    setValue(name, !checked, { shouldDirty: true, shouldTouch: true });
    if (!inputElRef.current) return;
    inputElRef.current.checked = !checked;
  };

  useEffect(() => {
    register(name);
  }, [register, name]);

  return (
    <>
      <div className={className} onClick={handleChange} {...rest}>
        <div
          className={cn([
            'h-5/6 aspect-square rounded-full bg-white border-[1px] border-black/30 shadow absolute top-1/2 -translate-y-1/2 right-auto',
            'transition-all duration-200 ease-in-out transform',
            checked && `translate-x-3`,
          ])}
        />
      </div>
      <input
        type='checkbox'
        ref={inputElRef}
        name={name}
        id={id}
        className='hidden'
      />
    </>
  );
};

export default Switch;
