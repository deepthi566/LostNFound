import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [showItemsFilter, setShowItemsFilter] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-white text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="flex flex-col items-start leading-tight">
            <span className="text-red-500 font-bold text-xl">Lost &</span>
            <span className="text-white font-bold text-xl flex items-center">
              Found
            </span>
          </div>
        </h1>

        {/* Centered Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/create" className="text-white hover:text-gray-200">
            Create
          </Link>

          {/* Items Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowItemsFilter(!showItemsFilter)}
              className="text-white hover:text-gray-200"
            >
              Items Browser
            </button>
            {showItemsFilter && (
              <div className="absolute top-8 left-0 bg-white rounded-md shadow-lg py-2 min-w-[120px]">
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    navigate("/items?filter=lost");
                    setShowItemsFilter(false);
                  }}
                >
                  Lost
                </button>
                <button
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    navigate("/items?filter=found");
                    setShowItemsFilter(false);
                  }}
                >
                  Found
                </button>
              </div>
            )}
          </div>

          <Link to="/my-items" className="text-white hover:text-gray-200">
            My Listings
          </Link>
        </div>

        {/* Right Side Buttons */}
        <div className="space-x-4 flex items-center">
          {!isLoggedIn ? (
            <>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
