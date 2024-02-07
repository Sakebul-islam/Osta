import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  const [value, setValue] = useState('');
  return (
    <div className='p-3 max-w-3xl mx-auto'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Post Title here'
            required
            id='title'
            className='flex-1 rounded-sm'
          />
          <div className='flex'>
            <div className='relative w-full'>
              <select className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-sm'>
                <option value='uncategorize'>Select a category</option>
                <option value='javascript'>JavaScript</option>
                <option value='reactjs'>React.js</option>
                <option value='nodejs'>Node.js</option>
              </select>
            </div>
          </div>
        </div>
        <div className='flex gap-4 items-center justify-between border-2 border-teal-500 border-dashed p-3'>
          <FileInput type='file' accept='image/*' />
          <button
            type='button'
            className='group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-gradient-to-br from-green-400 to-cyan-600 enabled:hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800 border-0 rounded-sm focus:ring-2 hover:animate-pulse'
          >
            <span className='items-center flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full rounded-sm text-sm px-3 py-1.5 border border-transparent'>
              Upload Image
            </span>
          </button>
        </div>
        <ReactQuill
          theme='snow'
          value={value}
          onChange={setValue}
          placeholder='Wright Something...'
          className='h-72 mb-12'
          required
        />
        <Button
          type='submit'
          gradientDuoTone='greenToBlue'
          className='hover:animate-pulse rounded-sm my-6'
        >
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
