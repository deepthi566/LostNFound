import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import placeholderImg from "../images/no-item.webp";
import { Edit, Trash2, MapPin, Phone, Info } from "lucide-react";

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/items/myItems", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setItems(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchMyItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:5000/api/items/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        setItems(items.filter((item) => item._id !== id));
        toast.success(res.data.message || "Item deleted successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete item");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Items</h2>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <img
            src={placeholderImg}
            alt="No Items"
            className="w-48 h-48 mb-6 opacity-70"
          />
          <p className="text-center text-gray-600 text-lg">
            You haven’t posted any items yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5"
            >
              {item.img?.length > 0 ? (
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper w-full h-56 rounded-xl mb-4"
                >
                  {item.img.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`http://localhost:5000/uploads/${image}`}
                        alt={`${item.name}-${index}`}
                        className="w-full h-56 object-cover rounded-xl"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="w-full h-56 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 mb-4">
                  No Image
                </div>
              )}

              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                {item.name}
              </h2>
              <p className="text-gray-500 text-sm">
                Posted on {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-3 flex items-center gap-1">
                <Info className="w-4 h-4" /> {item.description}
              </p>

              <p className="mb-2">
                <span
                  className={`px-3 py-1 text-sm rounded-full font-semibold ${
                    item.status === "lost"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {item.status.toUpperCase()}
                </span>
              </p>

              <div className="flex items-center text-gray-600 text-sm gap-2">
                <MapPin className="w-4 h-4" /> {item.location}
              </div>
              <div className="flex items-center text-gray-600 text-sm gap-2 mb-4">
                <Phone className="w-4 h-4" /> {item.number}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => navigate(`/update-item/${item._id}`)}
                  className="flex-1 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg transition duration-300 shadow-md"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyItems;
