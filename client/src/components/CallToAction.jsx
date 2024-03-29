import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-sm text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>Want to learn more about JavaScript?</h2>
        <p className='text-gray-500 my-2'>
          Checkout these resources with 100 JavaScript Projects
        </p>
        <Link
          to='http://sakebul.com/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button
            gradientDuoTone='purpleToPink'
            className='rounded-sm w-full hover:animate-pulse font-semibold'
          >
            Sakebul islam Portfolio
          </Button>
        </Link>
      </div>
      <div className='p-7 flex-1'>
        <img src='https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg' />
      </div>
    </div>
  );
}
