import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import DashboardLayout from '../Layout/DashboardLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard/Dashboard';
import DashboardProfile from '../pages/Dashboard/DashboardProfile';
import Projects from '../pages/Projects';
import ErrorPage from '../pages/ErrorPage';
import PrivateRoute from './PrivateRoute';
import AdminPrivateRoute from './AdminPrivateRoute';
import CreatePost from '../pages/CreatePost';
import PostPage from '../pages/PostPage';
import DashboardPost from '../pages/Dashboard/DashboardPost';
import UpdatePost from '../pages/UpdatePost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/projects', element: <Projects /> },
      { path: '/post/:postSlug', element: <PostPage /> },

      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),

    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/dashboard/create-post',
        element: (
          <AdminPrivateRoute>
            <CreatePost />
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/dashboard/posts',
        element: (
          <AdminPrivateRoute>
            <DashboardPost />
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/dashboard/update-post/:postId',
        element: (
          <AdminPrivateRoute>
            <UpdatePost />
          </AdminPrivateRoute>
        ),
      },
      {
        path: '/dashboard/profile',
        element: <DashboardProfile />,
      },
    ],
  },
]);

export default router;
