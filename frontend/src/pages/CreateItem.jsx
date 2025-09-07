import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import illustration from "../images/list-item.svg";

const CreateItem = () => {
  const navigate = useNavigate();
  const [previewImages, setPreviewImages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = not yet checked
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    status: "lost",
    number: "",
    img: [],
  });

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, img: files });
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "img") {
          formData.img.forEach((file) => data.append("img", file));
        } else {
          data.append(key, formData[key]);
        }
      });

      const res = await axios.post(
        "http://localhost:5000/api/items/newItem",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Action successful!");
        setFormData({
          name: "",
          description: "",
          location: "",
          status: "lost",
          number: "",
          img: [],
        });
        setPreviewImages([]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  // 🔹 Only render if logged in check is done
  if (isLoggedIn === null) return null; // or a loader

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row w-full max-w-6xl">
        <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-10">
          <img
            src={illustration}
            alt="Lost & Found Illustration"
            className="w-full h-auto max-w-sm rounded"
          />
        </div>

        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Create Lost/Found Item
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Item Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Contact Number"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {previewImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {previewImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`preview-${index}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))}
              </div>
            )}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
              Create Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
