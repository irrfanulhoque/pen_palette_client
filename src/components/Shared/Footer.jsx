import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import React Icons

const Footer = () => {
    return (
        <footer className="bg-black text-white py-8">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <div className="text-xl font-semibold">
                        <span>PenPalette</span>
                    </div>

                    <div className="flex space-x-6">
                        <a href="/" className="hover:text-gray-400">Home</a>
                        <a href="/about" className="hover:text-gray-400">About</a>
                        <a href="/contact" className="hover:text-gray-400">Contact</a>
                        <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
                    </div>


                    <div className="flex space-x-6">
                        <a href="https://www.facebook.com/" target='_blank' className="hover:text-gray-400">
                            <FaFacebookF size={24} /> 
                        </a>
                        <a href="https://twitter.com/" target='_blank' className="hover:text-gray-400">
                            <FaTwitter size={24} /> 
                        </a>
                        <a href="https://www.instagram.com/" target='_blank' className="hover:text-gray-400">
                            <FaInstagram size={24} /> 
                        </a>
                    </div>
                </div>

                <div className="text-center mt-8 text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} PenPalette. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
