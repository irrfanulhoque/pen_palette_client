import axios from 'axios';
import { useContext, useEffect } from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';


const axiosInstance = axios.create({
  baseURL: 'https://blog-website-server-liard.vercel.app',
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {

    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;
        if ([401, 403, 400].includes(status)) {
          console.error('Axios Error:', error.message); 
          logOut()
            .then(() => {
              console.log('Logged Out');
              navigate('/login');
            })
            .catch((logOutError) =>
              console.error('Logout Error:', logOutError.message)
            );
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [logOut, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
