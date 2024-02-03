import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import FooterCom from '../components/FooterCom';

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <div className='min-h-[calc(100vh-301px)]'>
        <Outlet />
      </div>
      <FooterCom />
    </>
  );
};

export default DashboardLayout;
