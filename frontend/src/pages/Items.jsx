import React, { useEffect, useState } from "react";
import axios from "axios";
import { Info, MapPin, Phone } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate, useLocation } from "react-router-dom";

// Placeholder if no image
const placeholderImg = "https://via.placeholder.com/300x224.png?text=No+Image";

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // local filter state
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/items", {
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
    fetchItems();
  }, []);

  // Read filter from URL query
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlFilter = searchParams.get("filter"); // 'lost', 'found', or null
    if (urlFilter === "lost" || urlFilter === "found") {
      setFilter(urlFilter);
    } else {
      setFilter("all");
    }
  }, [location.search]);

  // Apply filter to items
  const filteredItems =
    filter === "all" ? items : items.filter((item) => item.status === filter);

  if (loading)
    return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header + Dropdown */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">
          {filter === "all"
            ? "All Items"
            : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Items`}
        </h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="all">All Items</option>
          <option value="lost">Lost Items</option>
          <option value="found">Found Items</option>
        </select>
      </div>

      {/* Items grid */}
      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-20">
          No items found for this filter.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition"
            >
              {/* Images */}
              {item.img && item.img.length > 0 ? (
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="w-full h-56 rounded-xl mb-4"
                >
                  {item.img.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`http://localhost:5000/uploads/${img}`}
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

              {/* Details */}
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {item.name}
              </h2>
              <p className="text-gray-500 text-sm mb-2">
                Posted on {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-1 text-gray-600 mb-2">
                <Info className="w-4 h-4" /> {item.description}
              </p>

              <span
                className={`px-3 py-1 text-sm rounded-full font-semibold ${
                  item.status === "lost"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {item.status.toUpperCase()}
              </span>

              <div className="flex items-center gap-2 text-gray-600 mt-2">
                <MapPin className="w-4 h-4" /> {item.location}
              </div>
              <div className="flex items-center gap-2 text-gray-600 mt-1">
                <Phone className="w-4 h-4" /> {item.number}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Items;
