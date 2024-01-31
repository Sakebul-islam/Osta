import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

// icons
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

const Header = () => {
  const { pathname } = useLocation();

  return (
    <Navbar className='border-b-2'>
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
        <Button className='w-9 sm:w-12 h-8 sm:h-10 !rounded-sm' color='gray'>
          <FaMoon />
        </Button>
        <Link to='sign-in'>
          <Button className='!rounded-sm p-0 sm:px-2 sm:py-0.5' gradientDuoTone='purpleToBlue'>
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as='div' active={pathname === '/'}>
          <Link className='block' to='/'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link as='div' active={pathname === '/about'}>
          <Link className='block' to='/about'>
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link as='div' active={pathname === '/projects'}>
          <Link className='block' to='/projects'>
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
