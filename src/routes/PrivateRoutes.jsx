import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Loading from '../pages/Loading';
import { Navigate, useLocation } from 'react-router-dom';


const PrivateRoutes = ({children}) => {
    const { user ,loading } =  useContext(AuthContext);
    const location = useLocation 

    if(loading){
        return <Loading/>
    }

    if(user){
        return children;
    }
    return (
        <Navigate state={location.pathname} to='/login'/>
    );
};

export default PrivateRoutes;