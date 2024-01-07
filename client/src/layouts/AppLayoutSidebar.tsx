import { useEffect, useState } from 'react';
import { cn } from '../utils/cn';
import { FaCaretUp as CaretUpIcon } from 'react-icons/fa6';
import { Link, LinkProps } from 'react-router-dom';

const sidebarLinks = [
  {
    text: 'Dashboard',
    to: '/admin/dashboard',
  },
  {
    text: 'Products',
    children: [
      {
        text: 'All Products',
        to: '/admin/products',
      },
      {
        text: 'Products Manager',
        to: '/admin/products/manager',
      },
      {
        text: 'Add Product',
        to: '/admin/products/add',
      },
    ],
    icon: 'boxes.svg',
  },
  {
    text: 'Customers',
    children: [
      {
        text: 'All Customers',
        to: '/admin/customers',
      },
      {
        text: 'Customers Manager',
        to: '/admin/customers/manager',
      },
      {
        text: 'Add Customer',
        to: '/admin/customers/add',
      },
    ],
  },
  {
    text: 'Orders',
    children: [
      {
        text: 'All Orders',
        to: '/admin/orders',
      },
      {
        text: 'Orders Manager',
        to: '/admin/orders/manager',
      },
      {
        text: 'Add Order',
        to: '/admin/orders/add',
      },
    ],
  },
  {
    text: 'Reports',
    to: '/admin/reports',
  },
  {
    text: 'Settings',
    to: '/admin/settings',
  },
];

export default function AppSidebar() {
  return (
    <aside className='bg-f1-dark-panel text-neutral-200 text-lg flex-shrink-0 fixed inset-y-0 left-0 w-64 z-10'>
      <div>
        <h3 className='text-3xl py-4 text-center'>Logo</h3>
      </div>
      <nav className='flex flex-col gap-2 pb-4 px-4'>
        {sidebarLinks.map(({ text, to, icon, children }) => {
          if (children) {
            return (
              <AppSidebarSubmenu
                icon={icon && '/icons/' + icon}
                key={text}
                text={text}
                links={children}
              />
            );
          } else {
            return <AppSidebarLink icon={icon} key={to} to={to} text={text} />;
          }
        })}
      </nav>
    </aside>
  );
}

function AppSidebarLink({
  text = '',
  icon = '',
  className = '',
  ...props
}: LinkProps & { text?: string; icon?: string }) {
  return (
    <AppSidebarItem iconName={icon}>
      <Link className={cn('w-full', className)} {...props}>
        <span>{text}</span>
      </Link>
    </AppSidebarItem>
  );
}

function AppSidebarSubmenu({
  text = '',
  links = [],
  icon = undefined,
}: {
  text: string;
  icon: string | undefined;
  links?: { text: string; to: string }[];
}) {
  const [open, setOpen] = useState(false);

  const caretClasses = cn([
    'ml-auto',
    open ? 'text-amber-400' : 'text-neutral-400',
    'transition-transform duration-200',
    'transform',
    open ? 'rotate-180' : '',
  ]);

  return (
    <div className='flex flex-col gap-2 grow'>
      <AppSidebarItem iconName={icon}>
        <button
          className='grow flex items-center'
          onClick={() => setOpen(!open)}
        >
          <span>{text}</span>
          <CaretUpIcon className={caretClasses} />
        </button>
      </AppSidebarItem>
      {open && (
        <div className='flex flex-col ml-8'>
          {links.map(({ text, to }) => (
            <AppSidebarLink
              to={to}
              text={text}
              key={to}
              className='text-base'
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AppSidebarItem({
  iconName,
  children,
  className,
}: {
  iconName?: string | undefined;
} & React.HTMLProps<HTMLDivElement>) {
  const [icon, setIcon] = useState<string>();

  const classes = cn([
    'flex gap-4 px-4 py-2',
    'hover:bg-gray-800 rounded',
    'transition-colors duration-200',
    className,
  ]);

  useEffect(() => {
    if (icon || !iconName) {
      return;
    }

    (async () => {
      const image = await import(/* @vite-ignore */ iconName.toLowerCase());
      image && setIcon(image.default);
    })();
  }, [iconName, icon]);

  return (
    <div className={classes}>
      {icon && (
        <span>
          <img src={icon} alt='' className='w-6 h-6' />
        </span>
      )}
      {children}
    </div>
  );
}
