import moment from 'moment';
import { useEffect, useState } from 'react';

const Comment = ({ comment }) => {
  const [user, setUser] = useState({});
  console.log(user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/v1/user/${comment?.userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200 border-2 border-gray-100'
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <span className='font-bold mr-1 text-xs truncate text-gray-400'>
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className='text-gray-500 text-xs'>
            {moment(comment?.createdAt).fromNow()}
          </span>
        </div>
        <p className='text-gray-200 pb-2'>{comment?.content}</p>
      </div>
    </div>
  );
};

export default Comment;
