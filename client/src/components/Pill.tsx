import { cn } from '@/utils/cn';
import { IoCloseSharp as RemoveIcon } from 'react-icons/io5';

interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  removePill: () => void;
}

const colors = [
  { name: 'red', hsl: 'hsl(360, 70%, 40%)' },
  { name: 'indigo', hsl: 'hsl(210, 70%, 40%)' },
  { name: 'orange', hsl: 'hsl(30, 70%, 40%)' },
  { name: 'blue', hsl: 'hsl(240, 70%, 40%)' },
  { name: 'purple', hsl: 'hsl(270, 70%, 40%)' },
  { name: 'green', hsl: 'hsl(180, 70%, 40%)' },
  { name: 'pink', hsl: 'hsl(300, 70%, 40%)' },
  { name: 'yellow', hsl: 'hsl(60, 70%, 40%)' },
];

const Pill: React.FC<PillProps> = ({ index, children, removePill }) => {
  const color = colors[index % colors.length];

  return (
    <div
      className={cn(
        `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 mb-2`
      )}
      style={{ backgroundColor: `${color.hsl}` }}
    >
      {children}
      <span className='ml-2 cursor-pointer' onClick={removePill}>
        <RemoveIcon className='text-sm' />
      </span>
    </div>
  );
};

export default Pill;
