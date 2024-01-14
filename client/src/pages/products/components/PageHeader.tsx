import Panel from '@/components/layout/panel/Panel';
import PanelBody from '@/components/layout/panel/PanelBody';
import { cn } from '@/utils/cn';

export default function PageHeader({
  children,
  className = '',
  saved,
}: {
  children: React.ReactNode;
  className?: string;
  saved: boolean;
}) {
  return (
    <Panel as='header' className={cn('border-0 rounded-none', className)}>
      <PanelBody className='flex-row'>
        <h1 className='text-lg tracking-wide'>{children}</h1>
        <div className='ml-auto px-1 flex gap-4 bg-gray-800 border border-gray-800 rounded text-sm'>
          <span>Saved:</span>
          <div className='grid place-items-center'>
            {saved ? (
              <div className='rounded-full bg-green-500 w-3 h-3' />
            ) : (
              <div className='rounded-full bg-red-500 w-3 h-3' />
            )}
          </div>
        </div>
      </PanelBody>
    </Panel>
  );
}
