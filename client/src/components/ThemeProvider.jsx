import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <>
      <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen'>
        {children}
      </div>
    </>
  );
};

export default ThemeProvider;
