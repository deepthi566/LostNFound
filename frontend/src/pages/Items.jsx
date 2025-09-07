import React, { useEffect, useState } from "react";
import axios from "axios";
import { Info, MapPin, Phone } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useLocation, useNavigate } from "react-router-dom";

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

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

  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get("filter"); // 'lost' or 'found'

  const filteredItems = filter
    ? items.filter((item) => item.status === filter)
    : items;

  if (loading)
    return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {filter
          ? `${filter.charAt(0).toUpperCase() + filter.slice(1)} Items`
          : "All Items"}
      </h2>

      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No items found.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
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
              <p className="text-gray-500 text-sm mb-2">
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
              <div className="flex items-center text-gray-600 text-sm gap-2 mt-1">
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
