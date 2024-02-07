import { Sidebar } from 'flowbite-react';

import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

import { Link, useLocation } from 'react-router-dom';
import useSignout from '../../hooks/useSignout';

const DashboardSidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const handleSignout = useSignout();

  return (
    <Sidebar className='w-full md:w-64'>
      <Sidebar.Items className='h-full'>
        <Sidebar.ItemGroup className='h-full flex flex-col gap-1'>
          <div className='flex flex-col gap-1 grow'>
            <Link to='/dashboard'>
              <Sidebar.Item
                as='div'
                active={path === '/dashboard'}
                icon={MdOutlineDashboardCustomize}
                className='rounded-sm'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
            <Link to='/dashboard/profile'>
              <Sidebar.Item
                as='div'
                active={path === '/dashboard/profile'}
                icon={HiUser}
                label={'User'}
                labelColor='dark'
                className='rounded-sm'
              >
                Profile
              </Sidebar.Item>
            </Link>
          </div>
          <Link to='/dashboard/profile'>
            <Sidebar.Item
              onClick={handleSignout}
              as='div'
              icon={HiArrowSmRight}
              className='rounded-sm'
            >
              Sign Out
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashboardSidebar;
