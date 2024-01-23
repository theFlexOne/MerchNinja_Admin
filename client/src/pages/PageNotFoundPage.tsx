import Panel from '@/components/layout/panel/Panel';
import Page from './products/components/Page';
import PageHeader from './products/components/PageHeader';

export default function PageNotFoundPage() {
  return (
    <Page className='grid justify-center'>
      <div className='flex flex-col items-center text-primary'>
        <div className='text-[15rem]'>404</div>
        <div className='text-4xl font-bold'>Page Not Found</div>
      </div>
    </Page>
  );
}
