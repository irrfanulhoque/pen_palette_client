import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContext";
import useAxiosSecure from "../context/useAxiosSecure"; 
import { Helmet } from "react-helmet-async";


const WishList = () => {
    const { user } = useContext(AuthContext);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!user?.email) return; 

        const fetchWishlist = async () => {
            try {
                const res = await axiosSecure.get(`/wishlist/${user.email}`);
                setWishlist(res.data);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [axiosSecure, user?.email]);






    const handleRemove = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This item will be removed from your wishlist.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, remove it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const email = user.email;
                fetch(`https://blog-website-server-liard.vercel.app/removeFromWishlist/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            setWishlist((prev) => prev.filter((item) => item._id !== id));

                            Swal.fire("Removed!", "The item has been removed from your wishlist.", "success");
                        } else {
                            Swal.fire("Error", "No item was deleted. Please try again.", "error");
                        }
                    })
                    .catch((error) => {
                        console.error("Error removing item:", error);
                        Swal.fire("Error", "Failed to remove the item from your wishlist.", "error");
                    });
            }
        });
    };


    return (
        <div className="py-12 lg:h-[75vh] bg-white">
            <Helmet>
                <title>PenPalette | WishList</title>
            </Helmet>
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <h1 className="text-4xl font-semibold text-center text-black mb-8">My Wishlist</h1>
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : wishlist && wishlist.length > 0 ? (
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm text-left text-gray-800">
                            <thead className="bg-black text-white">
                                <tr>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Description</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlist.map((wish) => (
                                    <tr key={wish._id} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">{wish.title}</td>
                                        <td className="px-6 py-4">{wish.shortDescription}</td>
                                        <td className="px-6 py-4">{wish.category}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                                                onClick={() => handleRemove(wish._id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Your wishlist is empty.</p>
                )}

            </div>
        </div>
    );
};

export default WishList;
