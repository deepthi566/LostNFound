import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    status: "lost",
    number: "",
    img: [],
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(`http://localhost:5000/api/items/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const item = res.data.data;

        setFormData({
          name: item.name,
          description: item.description,
          location: item.location,
          status: item.status,
          number: item.number,
          img: [],
        });

        setExistingImages(item.img || []);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch item details!");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, navigate]);

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
      if (!token) {
        navigate("/login");
        return;
      }

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "img") {
          formData.img.forEach((file) => data.append("img", file));
        } else {
          data.append(key, formData[key]);
        }
      });

      await axios.put(`http://localhost:5000/api/items/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message || "Item updated successfully!");
        navigate("/my-items");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update item!");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading item...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Update Lost/Found Item
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Item Name"
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
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
            className="w-full border border-gray-300 p-3 rounded-lg"
            required
          />

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {existingImages.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:5000/uploads/${img}`}
                  alt="Existing"
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          )}

          {/* Custom File Upload */}
          <div className="w-full border border-gray-300 p-3 rounded-lg flex flex-col items-start cursor-pointer hover:border-blue-500 transition">
            <label
              htmlFor="file-upload"
              className="text-gray-700 font-medium cursor-pointer"
            >
              {formData.img.length > 0
                ? `${formData.img.length} file(s) selected`
                : "Upload New Images"}
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Preview New Images */}
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
