import { Button, Textarea } from 'flowbite-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { useSelector } from 'react-redux';

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment?.content);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/v1/user/${comment?.userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error?.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment?.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/v1/comment/editcomment/${comment?._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200 border-2 border-gray-100'
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className='flex-1 overflow-hidden text-wrap'>
        <div className='flex items-center mb-1'>
          <span className='font-bold mr-1 text-xs truncate text-gray-400'>
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className='text-gray-500 text-xs'>
            {moment(comment?.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className='mb-2 rounded-sm min-h-20 resize-none'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className='flex justify-end gap-2 text-xs'>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                onClick={handleSave}
                className='rounded-sm'
              >
                Save
              </Button>

              <button
                onClick={() => setIsEditing(false)}
                type='button'
                className='group hover:animate-pulse flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-gradient-to-br from-purple-600 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800 border-0 focus:ring-2 rounded-sm'
              >
                <span className='items-center flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full rounded-sm text-sm px-3 py-1.5 border border-transparent'>
                  Cancel
                </span>
              </button>
            </div>
          </>
        ) : (
          <>
            <p className='text-gray-200 pb-2'>{comment?.content}</p>
            <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
              <button
                type='button'
                onClick={() => onLike(comment?._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment?.likes?.includes(currentUser._id) &&
                  '!text-blue-500'
                }`}
              >
                <BiSolidLike className='text-sm' />
              </button>
              <p className='text-gray-400'>
                {/* {comment?.numberOfLikes > 0 &&
                  comment?.numberOfLikes +
                    ' ' +
                    (comment?.numberOfLikes === 1 ? 'like' : 'likes')} */}

                {comment?.numberOfLikes === 0
                  ? '0 like'
                  : comment?.numberOfLikes === 1
                  ? '1 like'
                  : comment?.numberOfLikes + ' likes'}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type='button'
                      onClick={handleEdit}
                      className='text-gray-400 hover:text-blue-500'
                    >
                      Edit
                    </button>
                    <button
                      type='button'
                      onClick={() => onDelete(comment._id)}
                      className='text-gray-400 hover:text-red-500'
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
