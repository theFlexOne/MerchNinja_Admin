import { HTMLProps, forwardRef, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import useOutsideClick from '@/hooks/useOutsideClick';
import useId from '@/hooks/useId';
import useForwardRef from '@/hooks/useForwardRef';
import InputFieldWrapper from './InputFieldWrapper';
import { SelectOptionType } from '@/types/app.types';
import { IoChevronDownSharp as ChevronDownIcon } from 'react-icons/io5';

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
      containerProps: {
        className: containerClassName = '',
        ...containerProps
      } = {
        className: '',
      },
      dropdownProps = {},
    }: SelectProps,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    const [selectedOption, setSelectedOption] = useState<SelectOptionType>(
      options[0]
    );
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    id = useId(id);

    const hiddenSelectRef = useForwardRef(ref);
    const customSelectRef = useRef<HTMLButtonElement>(null);
    const containerRef = useOutsideClick(() => setIsDropdownOpen(false));

    const handleOptionClick = (option: SelectOptionType) => {
      if (!hiddenSelectRef.current) return;
      setSelectedOption(option);
      setIsDropdownOpen(false);
      hiddenSelectRef.current.value = option.value;
      const changeEvent = new Event('change', { bubbles: true });
      hiddenSelectRef.current.dispatchEvent(changeEvent);
    };

    return (
      <>
        <div
          ref={containerRef}
          className={cn([
            'relative w-[30ch]',
            'flex flex-col gap-2',
            containerClassName,
          ])}
          {...containerProps}
        >
          {label && (
            <span
              className='text-neutral-400 text-sm'
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
              className={cn([
                'bg-transparent border-none outline-none',
                'w-full px-2 py-1',
                className,
              ])}
              tabIndex={0}
            >
              <div className='w-full flex items-center'>
                <span>{selectedOption?.label}</span>
                <ChevronDownIcon
                  className={cn([
                    'ml-auto inline',
                    'transition-transform duration-200 ease-in-out',
                    { 'transform rotate-180': isDropdownOpen },
                  ])}
                />
              </div>
            </button>
          </InputFieldWrapper>
          <SelectDropdownMenu
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
          defaultValue={selectedOption?.value ?? ''}
          id={id}
          className='absolute opacity-0 w-0 h-0'
          tabIndex={-1}
        >
          {renderNativeOptions(options)}
        </select>
      </>
    );
  }
);

function SelectDropdownMenu({
  options,
  handleOptionClick,
  isDropdownOpen,
  dropdownProps = {},
  selectedOption,
}: {
  options: Array<SelectOptionType>;
  handleOptionClick: (option: SelectOptionType) => void;
  isDropdownOpen: boolean;
  dropdownProps?: React.HTMLProps<HTMLDialogElement>;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  selectedOption: SelectOptionType;
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
          {renderOptions(options, handleOptionClick, selectedOption)}
        </ul>
      </div>
    </dialog>
  );
}

function renderNativeOptions(options: Array<SelectOptionType>) {
  return options.map((option) => {
    if (option.children) {
      return (
        <optgroup key={option.id} label={option.label}>
          {renderNativeOptions(option.children)}
        </optgroup>
      );
    }
    return (
      <option key={option.id} value={option.value}>
        {option.label}
      </option>
    );
  });
}

function renderOptions(
  options: Array<SelectOptionType>,
  handleOptionClick: (option: SelectOptionType) => void,
  selectedOption: SelectOptionType | null
) {
  return options.map((option) => {
    if (option.children) {
      return (
        <li key={option.id}>
          <span>{option.label}</span>
          <ul>
            {renderOptions(option.children, handleOptionClick, selectedOption)}
          </ul>
        </li>
      );
    }
    return (
      <li key={option.value}>
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
    );
  });
}

type SelectProps = HTMLProps<HTMLSelectElement> & {
  options: Array<SelectOptionType>;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  dropdownProps?: React.HTMLProps<HTMLDialogElement>;
};

export default Select;
