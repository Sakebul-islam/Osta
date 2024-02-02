import { Link } from 'react-router-dom';
import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';

import Logo from './Logo';

const FooterCom = () => {
  return (
    <Footer container className='border-y-4 border-gray-600  rounded-none'>
      <div className='w-full'>
        <div className='grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1'>
          <div>
            <Link to={'/'} className='inline-block mb-4 sm:mb-0'>
              <Logo />
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='about' />
              <Footer.LinkGroup col>
                <Footer.Link as='div'>
                  <Link to='https://sakebul.com/'>Sakebul.com</Link>
                </Footer.Link>
                <Footer.Link href='#'>Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  target='_blank'
                  href='https://github.com/Sakebul-islam'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='#'>Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by='Smallᵇˡᵒᵍ'
            year={new Date().getFullYear()}
          />
          <div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
            <Footer.Icon
              target='_blank'
              href='https://www.facebook.com/Sakebul66'
              icon={BsFacebook}
            />
            <Footer.Icon
              target='_blank'
              href='https://www.instagram.com/sakebul66/'
              icon={BsInstagram}
            />
            <Footer.Icon
              target='_blank'
              href='https://twitter.com/SakebulIslam'
              icon={FaXTwitter}
            />
            <Footer.Icon
              target='_blank'
              href='https://github.com/Sakebul-islam'
              icon={BsGithub}
            />
            <Footer.Icon
              target='_blank'
              href='https://dribbble.com/sakebul66'
              icon={BsDribbble}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
