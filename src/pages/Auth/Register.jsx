import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import { Helmet } from "react-helmet-async";

const Register = () => {
    const navigate = useNavigate();
    const { createUser } = useContext(AuthContext);
    const provider = new GoogleAuthProvider();

    const success = () => {
        Swal.fire({
            title: "Good job!",
            text: "Registration Successful!",
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

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!regex.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must contain at least 6 characters, including UPPER/lowercase and numbers!",
            });
            return;
        }

        createUser(email, password)
            .then((userCredential) => {
                e.target.reset();
                success();
                navigate('/login');
                const profile = {
                    displayName: name,
                    photoURL: photo,
                };
                updateProfile(auth.currentUser, profile)
                    .then(() => console.log("Profile updated"))
                    .catch((error) => console.log(error));
            })
            .catch((error) => {
                errorToast(error.message);
            });
    };

    const handleGoogleRegister = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result.user);
                navigate('/');
                success();
            })
            .catch((error) => {
                console.log(error);
                errorToast(error.message);
            });
    };

    return (
        <div className="hero h-auto lg:h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-r from-black via-transparent to-black overflow-y-auto lg:overflow-hidden">
            <Helmet>
                <title>PenPalette | Register</title>
            </Helmet>
            <div className="hero-content w-full flex-col lg:flex-row-reverse p-6 lg:p-0 h-full lg:max-h-full overflow-visible">
                <div className="card bg-transparent w-full max-w-lg shrink-0 shadow-2xl backdrop-blur-md bg-opacity-20">
                    <form onSubmit={handleRegister} className="card-body p-8 space-y-2">
                        <h1 className="text-5xl font-extrabold text-black mb-2">Register</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="input input-bordered bg-transparent text-black border-black focus:ring-2 focus:ring-white"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                name="photo"
                                placeholder="Photo URL"
                                className="input input-bordered bg-transparent text-black border-black focus:ring-2 focus:ring-white"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="input input-bordered bg-transparent text-black border-black focus:ring-2 focus:ring-white"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input input-bordered bg-transparent text-black border-black focus:ring-2 focus:ring-white"
                                required
                            />
                            <label className="label">
                                <NavLink to="/login" className="label-text-alt link link-hover text-black">
                                    Already have an account? Login
                                </NavLink>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-black text-white hover:bg-opacity-70 hover:text-black transition-all duration-300 px-8 py-3 rounded-full">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="flex justify-center items-center mb-2 p-3">
                        <button
                            onClick={handleGoogleRegister}
                            className="btn btn-outline text-black p-2 w-full md:w-1/2 bg-transparent border-black hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <FaGoogle className="ml-2" />
                            Register with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
