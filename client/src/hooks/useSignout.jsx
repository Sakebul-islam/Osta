import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

const useSignout = () => {
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/v1/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return handleSignout;
};

export default useSignout;
