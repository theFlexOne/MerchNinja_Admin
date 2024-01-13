import { CiSearch as SearchIcon } from 'react-icons/ci';
import { LiaUserAstronautSolid as UserIcon } from 'react-icons/lia';
import { FaMessage as MessageIcon } from 'react-icons/fa6';
import { FaConciergeBell as NotificationIcon } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';
import InputFieldWrapper from '../components/form/InputFieldWrapper';

export default function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={cn([
          'flex gap-6 items-center px-6',
          'fixed top-0 h-16 left-64 right-0 z-10',
          'bg-f1-dark-alt',
          { 'shadow-md': isScrolled },
        ])}
      >
        <AdminHeaderSearchbar />
        <nav className='ml-auto'>
          <ul className='flex gap-6 items-center'>
            <li>
              <button>
                <NotificationIcon className='text-xl text-neutral-200' />
              </button>
            </li>
            <li>
              <button>
                <MessageIcon className='text-xl text-neutral-200' />
              </button>
            </li>
            <li>
              <button>
                <UserIcon className='text-xl text-neutral-200' />
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

function AdminHeaderSearchbar() {
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('searching...');
  }

  return (
    <form id='adminHeaderSearchbar' onSubmit={handleSearch}>
      <InputFieldWrapper className='px-2 py-1'>
        <input
          type='text'
          placeholder='Search'
          className={'border-none outline-none bg-transparent'}
        />
        <button type='submit' form='adminHeaderSearchbar' className={''}>
          <SearchIcon className='text-xl text-neutral-200' />
        </button>
      </InputFieldWrapper>
    </form>
  );
}
