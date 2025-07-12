import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../context/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const UpdateBlog = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        axiosSecure
            .get(`/blog/${id}`)
            .then((response) => setFormData(response.data))
            .catch((err) => console.error("Error fetching blog data:", err));
    }, [id, axiosSecure]);

    const success = (name) => {
        Swal.fire({
            title: "Blog Updated Successfully! 🎉",
            text: `${name} has been updated.`,
            icon: "success",
        });
    };

    const errorToast = (e) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: e,
        });
    };

    const handleUpdateBlog = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const image = form.image.value;
        const category = form.category.value;
        const shortDescription = form.shortDescription.value;
        const description = form.description.value;

        const updateData = { title, image, category, shortDescription, description };

        axiosSecure
            .put(`/updateBlog/${id}`, updateData)
            .then((response) => {
                navigate(`/details/${id}`);
                success(response.data.title);
            })
            .catch((err) => {
                console.error("Error updating blog:", err);
                errorToast(err.response?.data?.message || "Failed to update blog. Please try again.");
            });
    };

    if (!formData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <Helmet>
                <title>PenPalette | Update</title>
            </Helmet>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8">Update Your Blog</h1>
                <form onSubmit={handleUpdateBlog}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block font-semibold">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={formData?.title || ""}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block font-semibold">
                            Image
                        </label>
                        <input
                            type="text"
                            id="image"
                            name="image"
                            defaultValue={formData?.image || ""}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block font-semibold">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            defaultValue={formData?.category || ""}
                            className="w-full px-4 py-2 border rounded-md"
                        >
                            <option value="">Select Category</option>
                            <option value="Technology">Technology</option>
                            <option value="Health">Health</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Education">Education</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="shortDescription" className="block font-semibold">
                            Short Description
                        </label>
                        <input
                            type="text"
                            id="shortDescription"
                            name="shortDescription"
                            defaultValue={formData?.shortDescription || ""}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block font-semibold">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={formData?.description || ""}
                            className="w-full px-4 py-2 border rounded-md"
                            rows="5"
                        />
                    </div>
                    {user && (
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-semibold">
                                User Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                value={user.email}
                                readOnly
                                className="w-full px-4 py-2 border rounded-md bg-gray-200"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Update Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateBlog;
