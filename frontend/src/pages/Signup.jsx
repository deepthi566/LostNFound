import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import signupIllustration from "../images/login-1.svg"; // Your image path
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth Context

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Get login function from context

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      if (res.data.success) {
        // ✅ Save token in AuthContext + localStorage
        login(res.data.data.token);

        toast.success(res.data.message || "Signup successful!");
        navigate("/"); // ✅ Go to homepage directly after signup
      } else {
        toast.error(res.data.message || "Signup failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Left Illustration */}
        <div className="md:w-1/2 flex items-center justify-center p-6 bg-gray-50">
          <img
            src={signupIllustration}
            alt="Signup Illustration"
            className="w-full h-auto max-w-sm"
          />
        </div>

        {/* Right Form */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Create Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
