import { Outlet } from 'react-router-dom';
import AppSidebar from './AppLayoutSidebar';
import AppHeader from './AppLayoutHeader';

export default function AppLayout() {
  return (
    <>
      <div
        id='rootContent'
        className='min-h-screen bg-f1-dark-bg text-neutral-100 relative'
      >
        <AppSidebar />
        <div className='flex flex-col ml-64'>
          <AppHeader />
          <main className='grow flex mt-16 w-full'>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
