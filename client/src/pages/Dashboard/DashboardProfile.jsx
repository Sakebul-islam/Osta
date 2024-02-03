import { useSelector } from 'react-redux';

import { Button, TextInput } from 'flowbite-react';

const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='max-w-lg mx-auto py-14 w-full'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          <img
            src={currentUser?.profilePicture}
            alt={currentUser?.username}
            title={currentUser?.username}
            className='rounded-full w-full h-full border-8 object-cover border-[lightGray]'
          />
        </div>

        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser?.username}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser?.email}
        />
        <TextInput type='password' id='password' placeholder='Password' />
        <Button
          type='submit'
          className='rounded-sm animate-pulse'
          gradientDuoTone='purpleToBlue'
        >
          Update
        </Button>
      </form>
      <div className='flex justify-between mt-5 text-red-500'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign out</span>
      </div>
    </div>
  );
};

export default DashboardProfile;
