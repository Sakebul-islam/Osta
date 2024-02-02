import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import FooterCom from '../components/FooterCom';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <FooterCom />
    </>
  );
};

export default MainLayout;
