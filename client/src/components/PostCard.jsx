import { Badge } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className='group relative w-full border border-blue-500 hover:border-2 h-[300px] overflow-hidden rounded-sm transition-all'>
      <Link to={`/post/${post?.slug}`}>
        <img
          src={post?.image}
          alt='post cover'
          className='h-[180px] w-full  object-cover group-hover:h-[130px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post?.title}</p>
        <Badge className='italic text-sm rounded-sm w-fit'>
          {post?.category}
        </Badge>
        <Link
          to={`/post/${post?.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 text-center py-2 rounded-sm m-2'
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
