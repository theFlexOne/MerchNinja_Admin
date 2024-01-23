import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import { cn } from '@/utils/cn';

export default function PageHeader({
  children,
  className = '',
  heading = '',
}: {
  children?: React.ReactNode;
  className?: string;
  heading?: string;
}) {
  return (
    <Panel
      as='header'
      className={cn('border-0 rounded-none w-full', className)}
    >
      <PanelBody className='flex-row'>
        <h1 className='text-lg tracking-wide'>{heading}</h1>
        {children}
      </PanelBody>
    </Panel>
  );
}
