import { Button, Select, Spinner, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: '',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/v1/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set(
      'searchTerm',
      sidebarData.searchTerm ? sidebarData.searchTerm : ''
    );
    urlParams.set('sort', sidebarData.sort ? sidebarData.sort : '');
    urlParams.set('category', sidebarData.category ? sidebarData.category : '');
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/v1/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-4 border-b md:border-b-0 md:border-r md:min-h-screen border-gray-500 md:min-w-40 lg:min-w-52'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex flex-col justify-start gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className='w-full'
            />
          </div>
          <div className='flex flex-col justify-start gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={sidebarData.sort}
              id='sort'
              className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-sm'
            >
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </select>
          </div>
          <div className='flex flex-col justify-start gap-2'>
            <label className='font-semibold'>Category:</label>
            <select
              onChange={handleChange}
              defaultValue={sidebarData.category}
              id='category'
              className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-sm'
            >
              <option value=''>All</option>
              <option value='uncategorized'>Uncategorized</option>
              <option value='reactjs'>React.js</option>
              <option value='nextjs'>Next.js</option>
              <option value='javascript'>JavaScript</option>
            </select>
          </div>
          <button
            type='submit'
            className='group hover:animate-pulse flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-gradient-to-br from-purple-600 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800 border-0 focus:ring-2 rounded-sm'
          >
            <span className='items-center flex justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white w-full rounded-sm text-sm px-3 py-1.5 border border-transparent'>
              Apply Filter
            </span>
          </button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-xl text-center my-12 relative after:absolute after:top-2/4 after:left-2/4 after:h-[.5px] after:w-3/4 md:after:w-2/4 after:-translate-x-2/4 after:-translate-y-2/4 after:bg-gray-300 dark:after:bg-gray-600'>
          <span className='bg-gray-600 text-white z-50 relative py-1 p-2 rounded-sm'>
            Recent Posts
          </span>
        </h1>
        <div className='p-7 pt-0 grid md:grid-cols-2 lg:grid-cols-3 gap-4 relative'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found.</p>
          )}
          {loading && (
            <div className='absolute top-0 left-0 right-0 bottom-0 min-h-screen flex justify-center items-center'>
              <Spinner size='xl' />
            </div>
          )}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
        {showMore && (
          <button
            onClick={handleShowMore}
            className='text-teal-500 text-lg hover:underline p-7 w-full'
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}
