import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Error from "../pages/Auth/Error";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllBlog from "../pages/AllBlog";
import BlogDetails from "../pages/BlogDetails";
import AddBlog from "../pages/AddBlog";
import FeaturedBlog from "../pages/FeaturedBlog";
import WishList from "../pages/WishList";
import UpdateBlog from "../pages/UpdateBlog";
import PrivateRoutes from "./PrivateRoutes";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<Error />,
    children:[
        {
            path: "/",
            element: <Home />,
        },
        {
          path:'/login',
          element:<Login />
        },
        {
          path:'/register',
          element: <Register></Register>
        },
        {
          path:'/about',
          element:<About></About>
        },
        {
          path:'/contact',
          element:<Contact></Contact>
        },
        {
          path:'/privacy',
          element:<PrivacyPolicy></PrivacyPolicy>
        },
        {
          path:'/allBlog',
          element:<AllBlog />,
          loader:()=> fetch ("https://blog-website-server-liard.vercel.app/allblog")
        },
        {
          path:"/details/:id",
          element:<PrivateRoutes><BlogDetails /></PrivateRoutes>,
          loader:({params})=>fetch(`https://blog-website-server-liard.vercel.app/blog/${params.id}`)
        },
        {
          path:"/addBlog",
          element:<PrivateRoutes><AddBlog /></PrivateRoutes>,
        },
        {
          path:"/featuredBlog",
          element:<FeaturedBlog />,
          loader:()=>fetch("https://blog-website-server-liard.vercel.app/allblog")
        },
        {
          path:"/wishlist/:email",
          element:<PrivateRoutes><WishList /></PrivateRoutes>,
          
        },
        {
          path:"/update/:id",
          element:<PrivateRoutes><UpdateBlog /></PrivateRoutes>,
        }
       




        
    ],
  },
]);

export default router;