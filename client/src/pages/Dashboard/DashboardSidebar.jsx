import { Sidebar } from 'flowbite-react';

import { HiArrowSmRight, HiDocumentText, HiUser } from 'react-icons/hi';
import { MdOutlineDashboardCustomize } from 'react-icons/md';

import { Link, useLocation } from 'react-router-dom';
import useSignout from '../../hooks/useSignout';
import { useSelector } from 'react-redux';

const DashboardSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const path = location.pathname;
  const handleSignout = useSignout();

  return (
    <Sidebar className='w-full md:w-64'>
      <Sidebar.Items className='h-full'>
        <Sidebar.ItemGroup className='h-full flex flex-col gap-1'>
          <div className='flex flex-col gap-1'>
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
                label={currentUser?.isAdmin ? 'Admin' : 'User'}
                labelColor='dark'
                className='rounded-sm'
              >
                Profile
              </Sidebar.Item>
            </Link>
            {currentUser?.isAdmin && (
              <Link to='/dashboard/posts'>
                <Sidebar.Item
                  as='div'
                  active={path === '/posts'}
                  icon={HiDocumentText}
                  className='rounded-sm'
                >
                  Posts
                </Sidebar.Item>
              </Link>
            )}
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
