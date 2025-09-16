import React from "react";
import findItemImg from "../images/home-right.webp";
import git from "../images/git.png";
import insta from "../images/insta.png";
import linkedin from "../images/linkedin.png";

// Replace with your image
// import aboutImg from "../images/about-us.svg"; // Replace with your image

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Section 1: Find Your Item - Full Screen */}
      <section className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 md:px-20 bg-gray-100">
        {/* Left Text */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
            Find Your Lost or Found Item
          </h1>
          <p className="text-gray-600 mb-8 text-lg md:text-xl leading-relaxed">
            Lost something valuable? Or found an item? Our platform helps you
            connect and reunite lost items with their owners quickly and
            efficiently.
          </p>
          <a
            href="/create"
            className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg font-semibold text-lg transition"
          >
            Get Started
          </a>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={findItemImg}
            alt="Find Item"
            className="w-full max-w-lg animate-fadeIn"
          />
        </div>
      </section>

      {/* Section 2: About Us */}
      <section className="px-6 md:px-20 py-32 bg-gray-100 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          About Us
        </h2>
        <p className="text-gray-600 mb-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          This platform is designed for helping people reunite with their lost
          belongings. Users can create, browse, and manage lost & found items
          easily. Our goal is to make the process fast, reliable, and
          user-friendly.
        </p>
        <div className="flex justify-center gap-6 mt-6">
          <a
            href="https://instagram.com/_deepthi06_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:underline font-semibold"
          >
            <img src={insta} alt="instagram" className="w-10 mt-1" />
          </a>
          <a
            href="https://linkedin.com/in/ramya-deepthi-jalli-5785b02a0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline font-semibold"
          >
            <img src={linkedin} alt="linkedin" className="w-10 mt-1" />
          </a>
          <a
            href="https://github.com/deepthi566"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:underline font-semibold"
          >
            <img src={git} alt="git" className="w-10 mt-1" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
