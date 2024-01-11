import { cn } from '@/utils/cn';

const Tabs = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(['flex grow justify-center', className])}>
      {children}
    </div>
  );
};

export default Tabs;
