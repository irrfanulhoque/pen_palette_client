import React, { useContext, useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';

const BlogDetailsPage = () => {
    const blog = useLoaderData();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (blog?._id) {
            axios
                .get(`https://blog-website-server-liard.vercel.app/comments/${blog._id}`)
                .then((response) => setComments(response.data))
                .catch((err) => console.error('Error fetching comments:', err));
        }
    }, [blog]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) {
            setError("Comment cannot be empty");
            return;
        }

        const commentData = {
            blogId: blog._id,
            userName: user?.displayName || "Anonymous",
            userProfilePicture: user?.photoURL || "",
            userEmail: user?.email || "",
            commentText: newComment,
        };

        try {
            const response = await axios.post("https://blog-website-server-liard.vercel.app/addComment", commentData);
            setComments((prev) => [...prev, response.data]);
            setNewComment("");
            setError("");
        } catch (err) {
            console.error("Error posting comment:", err);
            if (err.response?.status === 403) {
                setError("Authors cannot comment on their own blogs.");
            } else {
                setError("Failed to post comment. Please try again.");
            }
        }
    };


    const handleUpdateClick = () => {
        navigate(`/update/${blog._id}`);
    };

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <Helmet>
                <title>PenPalette | Details</title>
            </Helmet>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800 text-center">
                    {blog.title}
                </h1>

                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-56 sm:h-72 md:h-96 object-cover rounded-lg mb-6"
                />

                <p className="text-gray-700 leading-relaxed text-base sm:text-lg lg:text-xl mb-8">
                    {blog.description}
                </p>

                {user?.email === blog.userEmail ? (
                    <>
                        <button
                            onClick={handleUpdateClick}
                            className="block w-full sm:w-auto px-6 py-2 bg-black text-white text-center rounded-md hover:bg-gray-700 transition"
                        >
                            Update Blog
                        </button>
                        <div className="mt-10">

                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                                Comments
                            </h2>

                            <div className="space-y-6">
                                {comments.map((comment) => (
                                    <div
                                        key={comment._id}
                                        className="flex items-start space-x-4 border-b pb-4"
                                    >
                                        <img
                                            src={comment.userProfilePicture}
                                            alt={comment.userName}
                                            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 text-sm md:text-base">
                                                {comment.userName}
                                            </h4>
                                            <p className="text-gray-600 text-sm md:text-base">
                                                {comment.commentText}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {user?.email == blog.userEmail && (
                                <form
                                    onSubmit={handleCommentSubmit}
                                    className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm"
                                >
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Write your comment..."
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 resize-none"
                                        rows="4"
                                    />
                                    {error && (
                                        <p className="text-red-500 text-sm mt-2">{error}</p>
                                    )}
                                    <button
                                        type="submit"
                                        className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-600 transition w-full sm:w-auto"
                                    >
                                        Post Comment
                                    </button>
                                </form>
                            )}
                        </div>



                    </>

                ) : (
                    <div className="mt-10">

                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                            Comments
                        </h2>

                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div
                                    key={comment._id}
                                    className="flex items-start space-x-4 border-b pb-4"
                                >
                                    <img
                                        src={comment.userProfilePicture}
                                        alt={comment.userName}
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900 text-sm md:text-base">
                                            {comment.userName}
                                        </h4>
                                        <p className="text-gray-600 text-sm md:text-base">
                                            {comment.commentText}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {user?.email !== blog.userEmail && (
                            <form
                                onSubmit={handleCommentSubmit}
                                className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm"
                            >
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write your comment..."
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 resize-none"
                                    rows="4"
                                />
                                {error && (
                                    <p className="text-red-500 text-sm mt-2">{error}</p>
                                )}
                                <button
                                    type="submit"
                                    className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-600 transition w-full sm:w-auto"
                                >
                                    Post Comment
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogDetailsPage;
