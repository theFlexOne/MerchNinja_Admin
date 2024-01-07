import { cn } from '@/utils/cn';

type TooltipProps = {
  message: string;
  children: React.ReactNode;
  isVisible: boolean;
};

export default function Tooltip({
  message,
  children,
  isVisible,
}: TooltipProps) {
  return (
    <div className='group relative flex'>
      {children}
      <span
        className={cn(
          'absolute',
          'top-10',
          {
            'scale-100': isVisible,
            'scale-0': !isVisible,
          },
          'transition-all',
          'duration-1000',
          'rounded',
          'bg-gray-800',
          'p-2',
          'text-xs',
          'text-white'
        )}
      >
        {message}
      </span>
    </div>
  );
}
