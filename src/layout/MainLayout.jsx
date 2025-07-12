import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';
import Footer from '../components/Shared/Footer';
import { useLocation } from 'react-router-dom';


const MainLayout = () => {

    const location  = useLocation();

    const noFooterRoutes =[ '/login', '/register'];



    return (
        <div className='w-11/12 mx-auto'>
            <Navbar />
            <Outlet />
            {!noFooterRoutes.includes(location.pathname) && <Footer />}
        </div>
    );
};

export default MainLayout;