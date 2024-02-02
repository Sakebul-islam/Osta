import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import DashboardLayout from '../Layout/DashboardLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard/Dashboard';
import Projects from '../pages/Projects';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/projects', element: <Projects /> },
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,

    children: [
      {
        path: '/dashboard/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
