import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user);

    const links = <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/addBlog'>Add Blog</NavLink></li>
            <li><NavLink to="/allBlog">All Blog</NavLink></li>
            <li><NavLink to= "/featuredBlog">Featured Blog</NavLink></li>
            <li><NavLink to={`/wishList/${user?.email}`}>Wishlist</NavLink></li>
    </>

    const handleLogOut = ()=>{
        logOut();
        navigate('/login');
    }


    return (
        <div className="navbar sticky top-0 z-50 bg-black bg-opacity-30 backdrop-blur-lg transition-all duration-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="text-xl font-bold">PanPalette</a>
                <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            </div>
            
            <div className="navbar-end">
                {
                    user ? (<>
                        <button onClick={handleLogOut} btn btn-ghost className="btn">Logout</button>
                    </>):(<div className='flex gap-2'>
                        <Link to="/login" className="btn">Login</Link>
                        <Link to="/register" className="btn">Register</Link>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Navbar;