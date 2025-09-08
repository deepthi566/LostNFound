import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
    setShowMenu(false);
  };

  const handleFilter = (filter) => {
    if (filter === "all") {
      navigate("/items");
    } else {
      navigate(`/items?filter=${filter}`);
    }
    setShowDropdown(false);
    setShowMenu(false);
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

        {/* Menu Links - Desktop */}
        <div className="hidden md:flex items-center space-x-6 relative">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/create" className="text-white hover:text-gray-200">
            Create
          </Link>

          {/* Items Browser Dropdown - Click based */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 text-white hover:text-gray-200"
            >
              Items Browser <ChevronDown size={16} />
            </button>

            {showDropdown && (
              <div className="absolute top-8 left-0 bg-white border shadow-lg rounded-md w-44 py-2 z-50">
                <button
                  onClick={() => handleFilter("all")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  All Items
                </button>
                <button
                  onClick={() => handleFilter("lost")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Lost Items
                </button>
                <button
                  onClick={() => handleFilter("found")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Found Items
                </button>
              </div>
            )}
          </div>

          <Link to="/my-items" className="text-white hover:text-gray-200">
            My Listings
          </Link>
        </div>

        {/* Auth Buttons - Desktop */}
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

          {/* Mobile Items Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-between text-white w-full"
            >
              Items Browser <ChevronDown size={16} />
            </button>

            {showDropdown && (
              <div className="mt-2 bg-white rounded-md shadow-md">
                <button
                  onClick={() => handleFilter("all")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  All Items
                </button>
                <button
                  onClick={() => handleFilter("lost")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Lost Items
                </button>
                <button
                  onClick={() => handleFilter("found")}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Found Items
                </button>
              </div>
            )}
          </div>

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
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
