import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
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

        {/* Hamburger Button - mobile only */}
        <button
          className="md:hidden text-white"
          onClick={() => setShowMenu(!showMenu)}
        >
          ☰
        </button>

        {/* Menu Links - desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/create" className="text-white hover:text-gray-200">
            Create
          </Link>
          <Link to="/items" className="text-white hover:text-gray-200">
            Items Browser
          </Link>
          <Link to="/my-items" className="text-white hover:text-gray-200">
            My Listings
          </Link>
        </div>

        {/* Auth Buttons - desktop */}
        <div className="hidden md:flex space-x-4 items-center">
          {!isLoggedIn ? (
            <>
              <Link
                to="/signup"
                className="bg-purple-500 text-white px-4 py-2 rounded-lg"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-purple-500 text-white px-4 py-2 rounded-lg"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden bg-blue-500 mt-2 p-4 flex flex-col gap-2">
          <Link
            to="/"
            className="text-white"
            onClick={() => setShowMenu(false)}
          >
            Home
          </Link>
          <Link
            to="/create"
            className="text-white"
            onClick={() => setShowMenu(false)}
          >
            Create
          </Link>
          <Link
            to="/items"
            className="text-white"
            onClick={() => setShowMenu(false)}
          >
            Items Browser
          </Link>
          <Link
            to="/my-items"
            className="text-white"
            onClick={() => setShowMenu(false)}
          >
            My Listings
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/signup"
                className="text-white"
                onClick={() => setShowMenu(false)}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="text-white"
                onClick={() => setShowMenu(false)}
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setShowMenu(false);
              }}
              className="text-white"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
