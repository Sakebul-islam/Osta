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
            className='flex-1'
          />
          <Select>
            <option value='uncategorize'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nodejs'>Node.js</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-2 border-teal-500 border-dashed p-3'>
          <FileInput type='file' accept='image/*' />
          <Button
            type='button'
            gradientDuoTone='greenToBlue'
            size='sm'
            outline
            className='hover:animate-pulse'
          >
            Upload Image
          </Button>
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
