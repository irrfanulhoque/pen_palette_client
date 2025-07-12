import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const success = (name) => {
        Swal.fire({
            title: "Welcome Back! 🎉",
            text: `Hello, ${name}! You have successfully logged in.`,
            icon: "success",
        });
    };

    const error = (e) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: e,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const name = user?.displayName;
                e.target.reset();
                navigate('/');
                success(name);
            })
            .catch((err) => {
                error(err.message);
            });
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const name = result?.user?.displayName || "User";
                navigate('/');
                success(name);
            })
            .catch((error) => {
                console.log(error);
                error(error.message);
            });
    };

    return (
        <div className="hero lg:h-[90vh] bg-cover bg-center bg-gradient-to-r from-black via-transparent to-black">
            <Helmet>
                <title>PenPalette | Login</title>
            </Helmet>
            <div className="hero-content w-full flex-col lg:flex-row-reverse">
                <div className="card bg-transparent w-full max-w-lg shrink-0 shadow-2xl backdrop-blur-md bg-opacity-20">
                    <form onSubmit={handleLogin} className="card-body p-8 space-y-6">
                        <h1 className="text-5xl font-extrabold text-black mb-4">Sign In</h1>
                        <div className="form-control">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="input input-bordered bg-transparent text-white border-black focus:ring-2 focus:ring-white"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input input-bordered bg-transparent text-black border-black focus:ring-2 focus:ring-white"
                                required
                            />
                            <label className="label">
                                <NavLink to="/register" className="label-text-alt link link-hover text-black">
                                    New to the site? Register
                                </NavLink>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-black text-white hover:bg-opacity-90 transition-all duration-300 px-8 py-3 rounded-full">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="flex justify-center items-center mb-5 p-2">
                        <button
                            onClick={handleGoogleLogin}
                            className="btn btn-outline text-black p-2 w-full md:w-1/2 bg-transparent border-black hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <FaGoogle className="ml-2" />
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
