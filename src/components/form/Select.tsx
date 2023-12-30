import React, { ChangeEvent, forwardRef, useRef, useState } from 'react';
import cn from '@/utils/cn';
import useOutsideClick from '@/hooks/useOutsideClick';
import useId from '@/hooks/useId';
import { SelectOption } from '@/types/types';
import useForwardRef from '@/hooks/useForwardRef';
import InputFieldWrapper from './InputFieldWrapper';

const Select = forwardRef(
  (
    {
      id,
      className = '',
      name,
      label,
      onChange,
      onBlur,
      options,
      containerProps = {},
      dropdownProps = {},
    }: SelectProps,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    const [selectedOption, setSelectedOption] = useState<SelectOption>(
      options[0]
    );
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    id = useId(id);

    const hiddenSelectRef = useForwardRef(ref);
    const customSelectRef = useRef<HTMLButtonElement>(null);
    const containerRef = useOutsideClick(() => setIsDropdownOpen(false));

    containerProps.className = getContainerClasses(
      containerProps.className ?? ''
    );

    const handleOptionClick = (option: SelectOption) => {
      if (!hiddenSelectRef.current) return;
      setSelectedOption(option);
      setIsDropdownOpen(false);
      updateHiddenSelectValue(hiddenSelectRef, option);
    };

    return (
      <>
        <div ref={containerRef} {...containerProps}>
          {label && (
            <span
              className='text-gray-400 text-sm'
              onClick={() => customSelectRef.current?.focus()}
            >
              {label}
            </span>
          )}
          <InputFieldWrapper>
            <button
              ref={customSelectRef}
              type='button'
              id={id}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={getInputClasses(className)}
              tabIndex={0}
            >
              {selectedOption?.label}
            </button>
          </InputFieldWrapper>
          <DropdownMenu
            options={options}
            handleOptionClick={handleOptionClick}
            isDropdownOpen={isDropdownOpen}
            selectedOption={selectedOption!}
            {...dropdownProps}
          />
        </div>
        <select
          ref={hiddenSelectRef}
          name={name}
          onChange={onChange}
          onFocus={() => customSelectRef.current?.focus()}
          onBlur={onBlur}
          defaultValue={selectedOption?.value}
          id={id}
          className='absolute opacity-0 w-0 h-0'
          tabIndex={-1}
        >
          {options.map((option) => (
            <option key={option.value as React.Key} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </>
    );
  }
);

function DropdownMenu({
  options,
  handleOptionClick,
  isDropdownOpen,
  dropdownProps = {},
  selectedOption,
}: {
  options: Array<SelectOption>;
  handleOptionClick: (option: SelectOption) => void;
  isDropdownOpen: boolean;
  dropdownProps?: React.HTMLProps<HTMLDialogElement>;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  selectedOption: SelectOption;
}) {
  return (
    <dialog
      open={isDropdownOpen}
      className={cn([
        'mt-1 rounded-md absolute top-full w-full max-h-64 overflow-y-scroll z-20',
        dropdownProps.className,
      ])}
      {...dropdownProps}
    >
      <div className='w-[min(auto,_100%)]'>
        <ul className='bg-f1-dark-alt rounded shadow-lg z-20 text-neutral-200 transition-all duration-200 ease-in-out overflow-hidden'>
          {options.map((option) => (
            <li key={option.value as React.Key}>
              <button
                type='button'
                className={cn([
                  'w-full px-4 py-2',
                  'text-left',
                  'hover:bg-primary-500/40',
                  {
                    'bg-neutral-600/40': option.value === selectedOption?.value,
                  },
                ])}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}

function updateHiddenSelectValue(
  hiddenSelectRef: React.RefObject<HTMLSelectElement>,
  option: SelectOption
) {
  if (!hiddenSelectRef.current) return;
  hiddenSelectRef.current.value = '' + option.value;
  const changeEvent = new Event('change', { bubbles: true });
  hiddenSelectRef.current.dispatchEvent(changeEvent);
}

function getInputClasses(className: string) {
  return cn([
    'bg-transparent border-none outline-none',
    'text-start',
    'w-full px-2 py-1',
    className,
  ]);
}

function getContainerClasses(className: string) {
  return cn(['relative w-[30ch]', 'flex flex-col gap-2', className]);
}

type SelectProps = {
  id?: string;
  className?: string;
  name?: string;
  value?: string;
  label?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: Array<SelectOption>;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  dropdownProps?: React.HTMLProps<HTMLDialogElement>;
  defaultValue?: string;
};

export default Select;
