import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

const SignUp = () => {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto gap-5'>
        {/* left site */}
        <div className='flex-1'>
          <Link className='inline-block text-4xl'>
            <Logo />
          </Link>
          <p className='mt-5 text-sm'>
            This is a MERN Blog website. You can sign up with your email and
            password or with Google signIn method.
          </p>
        </div>

        {/* right site */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <Label value='User Name' />
              <TextInput
                id='username'
                type='text'
                placeholder='Username'
                required
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label value='Email' />
              <TextInput id='email' type='email' placeholder='example@email.com' required />
            </div>
            <div className='flex flex-col gap-1'>
              <Label value='Password' />
              <TextInput
                id='password'
                type='password'
                placeholder='Password'
                required
              />
            </div>
            <Button
              className='rounded-sm hover:animate-pulse'
              gradientDuoTone='purpleToPink'
              type='submit'
            >
              Sign Up
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span className=''>Have an account ?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
