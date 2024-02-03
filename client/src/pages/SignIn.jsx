import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import toast from 'react-hot-toast';

import { BiHide, BiShowAlt } from 'react-icons/bi';

import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);

  // redux
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields.'));
    }
    try {
      dispatch(signInStart());
      // setErrorMessage(null);
      const res = await fetch('/api/v1/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // setLoading(false);
        dispatch(signInFailure(data.message));
      }
      // setLoading(false);
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='min-h-screen mt-20 select-none'>
      <div className='flex flex-col md:flex-row md:items-center p-3 max-w-3xl mx-auto gap-5'>
        {/* left site */}
        <div className='flex-1'>
          <Link className='inline-block text-4xl'>
            <Logo />
          </Link>
          <p className='mt-5 text-sm'>
            This is a MERN Blog website. You can sign in with your email and
            password or with Google signIn method.
          </p>
        </div>

        {/* right site */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1'>
              <Label value='Email' />
              <TextInput
                id='email'
                type='email'
                placeholder='example@email.com'
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <Label value='Password' />
              <div className='relative'>
                <TextInput
                  id='password'
                  type={show ? 'text' : 'password'}
                  placeholder='Password'
                  onChange={handleChange}
                />
                <span
                  className='absolute top-2/4 right-[1px] rounded-r-sm -translate-y-2/4 p-3 bg-gray-300 inline-block cursor-pointer'
                  onClick={() => setShow(!show)}
                >
                  {show ? <BiShowAlt /> : <BiHide />}
                </span>
              </div>
            </div>
            <Button
              className='rounded-sm hover:animate-pulse'
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <hr className='border-t-2' />
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span className=''>Don't have an account ?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {error && (
            <Alert className='mt-5' color='failure'>
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
