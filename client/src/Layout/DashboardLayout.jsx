import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import FooterCom from '../components/FooterCom';
import DashboardSidebar from '../pages/Dashboard/DashboardSidebar';

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <div className='min-h-[calc(100vh-301px)] flex flex-col md:flex-row'>
        <div className='w-full md:w-64'>
          <DashboardSidebar />
        </div>
        <div className='w-full'>
          <Outlet />
        </div>
      </div>
      <FooterCom />
    </>
  );
};

export default DashboardLayout;
