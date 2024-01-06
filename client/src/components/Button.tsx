import cn from '@/utils/cn';

type ButtonProps = {
  color?: keyof (typeof styles)['colors'];
  size?: keyof (typeof styles)['sizes'];
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const styles = {
  base: [
    'border border-transparent',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'transition ease-in-out duration-150',
  ],
  colors: {
    primary: [
      'bg-amber-400 text-gray-900',
      'hover:bg-amber-500',
      'focus:ring-amber-500',
    ],
    secondary: [
      'bg-gray-400 text-gray-900',
      'hover:bg-gray-500',
      'focus:ring-gray-500',
    ],
    tertiary: [
      'bg-amber-400/20 text-gray-200',
      'hover:bg-amber-400/40',
      'focus:ring-amber-500',
    ],
    danger: [
      'bg-red-400 text-gray-900',
      'hover:bg-red-500',
      'focus:ring-red-500',
    ],
    success: [
      'bg-green-400 text-gray-900',
      'hover:bg-green-500',
      'focus:ring-green-500',
    ],
    warning: [
      'bg-yellow-400 text-gray-900',
      'hover:bg-yellow-500',
      'focus:ring-yellow-500',
    ],
  },
  sizes: {
    sm: ['text-sm px-2 py-1', 'rounded-md font-medium'],
    md: ['text-base px-4 py-2', 'rounded-md font-bold'],
    lg: ['text-lg px-6 py-3', 'rounded-lg font-bold'],
  },
};

const Button = ({
  color = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => {
  className = cn(
    styles.base,
    styles.colors[color],
    styles.sizes[size],
    className
  );
  return (
    <button className={className} type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
