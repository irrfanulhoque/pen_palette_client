import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion"; 
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AllBlog = () => {
    const { user } = useContext(AuthContext);

    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://blog-website-server-liard.vercel.app/allBlog")
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
                const uniqueCategories = [...new Set(data.map((blog) => blog.category))];
                setCategories(uniqueCategories);
            });
    }, []);

    const handleFilter = () => {
        const queryParams = new URLSearchParams({
            category: selectedCategory || "",
            search: searchQuery || "",
        }).toString();

        fetch(`https://blog-website-server-liard.vercel.app/allBlog?${queryParams}`)
            .then((res) => res.json())
            .then((data) => setBlogs(data));
    };

    const successToast = () => {
        Swal.fire({
            title: "Added to Wishlist Successfully! 🎉",
            text: "The blog has been added to your Wishlist.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            timer: 3000,
            timerProgressBar: true,
        });
    };

    const errorToast = (error) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
        });
    };

    const handleAddToWishlist = (email, blogId) => {
        if (!email) {
            errorToast("You need to be logged in to add to Wishlist!");
            navigate("/login");
            return;
        }

        fetch("https://blog-website-server-liard.vercel.app/addToWishlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, blogId }),
        })
            .then((res) => res.json())
            .then((response) => {
                if (response === "Already Added") {
                    errorToast("This blog is already in your Wishlist.");
                } else {
                    successToast();
                }
            })
            .catch((error) => errorToast(error.message));
    };

    return (
        <div className="bg-white min-h-screen py-12">
            <Helmet>
                <title>PenPalette | AllBlog</title>
            </Helmet>
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-black text-center mb-8">
                    Explore Blogs
                </h1>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        value={selectedCategory}
                    >
                        <option value="">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search by title..."
                            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-auto"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            className="px-4 py-2 bg-black text-white rounded-md w-full sm:w-auto hover:bg-gray-800"
                            onClick={handleFilter}
                        >
                            Filter
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {blogs.map((blog) => (
                        <motion.div
                            key={blog._id}
                            className="bg-white shadow-lg rounded-md overflow-hidden border border-gray-200"
                            initial={{ opacity: 0, y: 50 }} 
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                transition: { duration: 1, ease: "easeOut" },
                            }} 
                            viewport={{ once: true }} 
                        >
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-black mb-4">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-700 mb-6">{blog.shortDescription}</p>
                                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                                    <Link
                                        to={`/details/${blog._id}`}
                                        className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800"
                                    >
                                        Details
                                    </Link>
                                    <button
                                        onClick={() => handleAddToWishlist(user?.email, blog._id)}
                                        className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800"
                                    >
                                        Add to Wishlist
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllBlog;
