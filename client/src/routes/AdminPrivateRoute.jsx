import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminPrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser?.isAdmin ? (
    children
  ) : (
    <Navigate to='/sign-in' />
  );
};

export default AdminPrivateRoute;
