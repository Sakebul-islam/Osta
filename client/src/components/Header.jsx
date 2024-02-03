import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

// icons
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { MdOutlineWbSunny } from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

const Header = () => {
  const { pathname } = useLocation();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Navbar className='shadow-md'>
      <Link to='/'>
        <Logo />
      </Link>

      <form>
        <TextInput
          className='rounded-sm hidden lg:block'
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
        />
      </form>
      <Button className='w-9 sm:w-12 h-8 sm:h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex items-center gap-2 md:order-2'>
        <Button
          className='w-9 sm:w-12 h-8 sm:h-10 !rounded-sm'
          color='gray'
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? (
            <FaMoon size={18} />
          ) : (
            <MdOutlineWbSunny size={20} />
          )}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt='user' img={currentUser.profilePicture} />}
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to='/dashboard?tab=profile'>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button
              className='hover:animate-pulse'
              gradientDuoTone='purpleToBlue'
              outline
            >
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as='div' active={pathname === '/'}>
          <Link className='block text-lg font-semibold' to='/'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link as='div' active={pathname === '/about'}>
          <Link className='block text-lg font-semibold' to='/about'>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link as='div' active={pathname === '/projects'}>
          <Link className='block text-lg font-semibold' to='/projects'>
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
