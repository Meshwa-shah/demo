import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaCity,
  FaList,
  FaQuestionCircle,
  FaBloggerB,
  FaImages,
  FaVideo,
  FaComments,
  FaTags,
  FaEnvelope,
  FaServicestack,
  FaCalendarCheck,
  FaRandom,
  FaPhotoVideo,
  FaChartBar,
  FaFileAlt,
  FaClinicMedical,
} from "react-icons/fa";

export default function Dashboard() {
  const [cards, setCards] = useState([
    { title: "City",  value: 0, icon: FaCity, color: "text-yellow-400"},
    { title: "Category FAQ", value: 0, icon: FaQuestionCircle, color: "text-green-400" },
    { title: "Blog", value: 0, icon: FaBloggerB, color: "text-purple-400" },
    { title: "Inquiry", value: 0, icon: FaEnvelope, color: "text-pink-400" },
    { title: "Redirection (URL)", value: 0, icon: FaRandom, color: "text-green-400" },
    { title: "Appointment", value: 0, icon: FaCalendarCheck, color: "text-yellow-400" },
    { title: "Services", value: 0, icon: FaServicestack, color: "text-purple-500" },
    { title: "Image Gallery", value: 0, icon: FaImages, color: "text-blue-400" },
    { title: "Media", value: 0, icon: FaPhotoVideo, color: "text-indigo-400" },
    { title: "Video Gallery", value: 0, icon: FaVideo, color: "text-red-400" },
    { title: "Category", value: 0, icon: FaList, color: "text-red-400" },
    { title: "Testimonials", value: 0, icon: FaComments, color: "text-green-400" },
    { title: "Offers", value: 0, icon: FaTags, color: "text-blue-500" },
    { title: "CMS", value: 0, icon: FaFileAlt, color: "text-red-400" },
    { title: "Our Fact", value: 0, icon: FaChartBar, color: "text-purple-400" },
    { title: "Our Clinic", value: 0, icon: FaClinicMedical, color: "text-purple-400" },
  ]);

  const arr = [
    "city",
    "faq",
    "blog",
    "inquiry",
    "url",
    "appointment",
    "service",
    "image",
    "media",
    "video",
    "category",
    "testimonial",
    "offer",
    "cms",
    "fact",
    "clinic"
  ];
  const links = ["city", "category-faq", "blog", "inquiry", "redirection", "appointment","services", "gallery", "media", "videogallery","category-faq","testimonials", "offer", "cms", "our-fact", "clinic"];
  async function fetchData() {
    try {
      const responses = await Promise.all(
        arr.map((el) => axios.get(`http://localhost:8081/${el}/fetch`))
      );

      // Log once to check backend structure
      // console.log("API Responses:", responses.map((r) => r.data));

      // Safely extract length from each response
      const updatedCards = cards.map((card, i) => {
        const count =
          responses[i]?.data?.data?.length ??
          responses[i]?.data?.length ??
          0; 
        return { ...card, value: count };
      });

      setCards(updatedCards);
      // console.log("✅ Updated cards:", updatedCards);
    } catch (error) {
      // console.error("❌ Error fetching dashboard data:", error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 sm:p-8">
      <h1 className=" sm:text-3xl font-bold text-black mb-8 text-center sm:text-left">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
       {cards.map((card, index) => (
         <Link to={`/${links[index]}`}><div
            key={index}
            className="flex flex-col opacity-[0.9] justify-between bg-blue-900 text-white rounded-2xl p-5 sm:p-6 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                {card.title}
              </h3>
              <div className={`text-3xl sm:text-4xl ${card.color}`}>
                <card.icon />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold mt-4 break-all">
              {card.value}
            </div>
          </div></Link>
        ))}
      </div>
    </div>
  );
}
