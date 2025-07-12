import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import useAxiosSecure from '../context/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: '',
    shortDescription: '',
    description: '',
  });

  const [error, setError] = useState('');

  const success = () => {
    Swal.fire({
      title: 'Blog Added Successfully! 🎉',
      text: 'The blog has been added successfully.',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, image, category, shortDescription, description } = formData;

    if (!title || !image || !category || !shortDescription || !description) {
      setError('All fields are required');
      return;
    }

    try {
      const createdAt = new Date().toISOString();
      await axiosSecure.post('/addBlog', {
        ...formData,
        userEmail: user?.email,
        userName: user?.displayName,
        createdAt,
      });

      setError('');
      navigate('/allBlog'); 
      success();
    } catch (err) {
      console.error('Error adding blog:', err);
      setError('Failed to add blog. Please try again.');
    }
  };

  return (
    <div className="add-blog-page bg-white min-h-screen flex justify-center items-center py-12 px-4">
      <Helmet>
                <title>PenPalette | AddBlog</title>
            </Helmet>
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-black mb-8">Add New Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="title" className="text-lg font-semibold text-black">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image" className="text-lg font-semibold text-black">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="text-lg font-semibold text-black">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="shortDescription" className="text-lg font-semibold text-black">Short Description</label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Enter a short description"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="text-lg font-semibold text-black">Long Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a detailed description"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="text-center">
            <button type="submit" className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300 ease-in-out">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
