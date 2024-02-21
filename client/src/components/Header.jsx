import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

// icons
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { MdOutlineWbSunny } from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import useSignout from '../hooks/useSignout';
import { useEffect, useState } from 'react';

const Header = () => {
  const { pathname } = useLocation();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSignout = useSignout();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <Navbar className='shadow-md'>
      <Link to='/'>
        <Logo />
      </Link>

      <form onSubmit={handleSubmit}>
        <TextInput
          className='rounded-sm hidden lg:block'
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          defaultValue={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
            <Link to='/dashboard'>
              <Dropdown.Item>Dashboard</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Link to='/dashboard/profile'>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
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
