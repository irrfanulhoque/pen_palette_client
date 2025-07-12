import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import { Helmet } from "react-helmet-async";

const Home = () => {
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetch("https://blog-website-server-liard.vercel.app/recentBlog")
            .then((res) => res.json())
            .then((data) => {
                setRecentBlogs(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching recent blogs:", error);
                setLoading(false);
            });
    }, []);



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

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Thank you for subscribing!",
            text: `We will keep you updated at ${email}.`,
            icon: "success",
            confirmButtonColor: "#3085d6",
        });
        setEmail("");
    };

    return (
        <div>
           <Helmet>
                <title>PenPalette | Home</title>
            </Helmet>
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="bg-gradient-to-r from-blue-900 via-black to-purple-900 text-white h-96 flex items-center justify-center text-center"
            >
                <motion.div
                    className="space-y-4"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                   
                    <h1 className="text-5xl font-extrabold tracking-wide glitch-effect">
                        Welcome to <span className="text-purple-500">PenPalette</span>
                    </h1>
                    <p className="text-2xl text-gray-300 mt-4">
                        Where words paint stories and ideas come to life.
                    </p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <p className="text-lg text-gray-400 italic">
                            "Inspiration in every stroke, passion in every word."
                        </p>
                    </motion.div>
                </motion.div>
            </motion.section>
           
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="py-16 bg-gray-100"
            >
                <div className="container mx-auto px-6 sm:px-8 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8">
                        Explore Our Featured Stories
                    </h2>
                    <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                        Dive into a selection of stunning stories and visuals that inspire and captivate. Hover over the images for more details!
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative overflow-hidden bg-white rounded-lg shadow-md"
                        >
                            <img
                                src="https://i.ibb.co.com/r4w8C4C/image.png"
                                alt="Story 1"
                                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-0 hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                                <h3 className="text-lg font-bold text-white">
                                    The Art of Adventure
                                </h3>
                                <p className="text-sm text-gray-300">
                                    Discover the thrill of exploring the great outdoors.
                                </p>
                            </div>
                        </motion.div>

                        
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative overflow-hidden bg-white rounded-lg shadow-md"
                        >
                            <img
                                src="https://i.ibb.co.com/FgW3287/image.png"
                                alt="Story 2"
                                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-0 hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                                <h3 className="text-lg font-bold text-white">
                                    Culinary Delights
                                </h3>
                                <p className="text-sm text-gray-300">
                                    Indulge in the beauty of gourmet cuisine.
                                </p>
                            </div>
                        </motion.div>

                        
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative overflow-hidden bg-white rounded-lg shadow-md"
                        >
                            <img
                                src="https://i.ibb.co.com/3BMZCK9/image.png"
                                alt="Story 3"
                                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-0 hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                                <h3 className="text-lg font-bold text-white">
                                    The Urban Aesthetic
                                </h3>
                                <p className="text-sm text-gray-300">
                                    Experience the allure of cityscapes.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>


          
            <motion.section
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="py-16 bg-gray-100"
            >
                <div className="container mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-gray-800">
                        Recent Blog Posts
                    </h2>
                    {loading ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : recentBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recentBlogs.map((blog) => (
                                <motion.div
                                    key={blog._id}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-300"
                                >
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-56 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4">
                                            {blog.title}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {blog.shortDescription}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <Link
                                                to={`/details/${blog._id}`}
                                                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md shadow-lg hover:from-blue-600 hover:to-purple-600"
                                            >
                                                Details
                                            </Link>
                                            <button
                                                onClick={() => handleAddToWishlist(user?.email, blog._id)}
                                                className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-purple-400"
                                            >
                                                Add to Wishlist
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No recent blogs found.</p>
                    )}
                </div>
            </motion.section>
            
            <motion.section
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="py-12 bg-gradient-to-b from-gray-900 to-black text-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                        Tips for Bloggers
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-300">
                            <h3 className="text-xl font-semibold mb-4">🚀 Write Engaging Content</h3>
                            <p className="text-gray-300">
                                Capture your audience's attention with original and well-researched articles that add value to their lives.
                            </p>
                        </div>
                       
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-300">
                            <h3 className="text-xl font-semibold mb-4">🎨 Use Attractive Visuals</h3>
                            <p className="text-gray-300">
                                Enhance your blog with high-quality images and graphics to make your content visually appealing.
                            </p>
                        </div>
                      
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-300">
                            <h3 className="text-xl font-semibold mb-4">📱 Leverage Social Media</h3>
                            <p className="text-gray-300">
                                Share your posts across social platforms to reach a broader audience and drive traffic to your blog.
                            </p>
                        </div>
                     
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-300">
                            <h3 className="text-xl font-semibold mb-4">⏰ Stay Consistent</h3>
                            <p className="text-gray-300">
                                Maintain a consistent posting schedule to keep your readers engaged and coming back for more.
                            </p>
                        </div>
                    
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-300">
                            <h3 className="text-xl font-semibold mb-4">💬 Engage with Your Audience</h3>
                            <p className="text-gray-300">
                                Respond to comments and emails to build a strong connection with your readers and foster loyalty.
                            </p>
                        </div>
                        
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition duration-300">
                            <h3 className="text-xl font-semibold mb-4">📈 Track Your Analytics</h3>
                            <p className="text-gray-300">
                                Use analytics tools to monitor your blog's performance and adapt your strategies to grow effectively.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="bg-gradient-to-b from-gray-900 to-black text-white py-16"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
                        Subscribe to Our Newsletter
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
                    >
                        <input
                            type="email"
                            className="px-6 py-3 rounded-md border border-gray-700 bg-gray-800 text-white w-full sm:w-80 focus:ring focus:ring-purple-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-md hover:from-blue-500 hover:to-purple-500"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
