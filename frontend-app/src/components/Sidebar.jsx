import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaCity,
  FaList,
  FaBook,
  FaImage,
  FaVideo,
  FaComment,
  FaGift,
  FaEnvelope,
  FaTools,
  FaCalendar,
  FaRandom,
  FaPhotoVideo,
  FaBalanceScale,
  FaFileAlt,
  FaClinicMedical
} from "react-icons/fa";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const location = useLocation();

  const items = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "City", path: "/city", icon: <FaCity /> },
    { name: "Category", path: "/category", icon: <FaList /> },
    { name: "Category FAQ", path: "/category-faq", icon: <FaBook /> },
    { name: "Blog", path: "/blog", icon: <FaFileAlt /> },
    { name: "Gallery", path: "/gallery", icon: <FaImage /> },
    { name: "Video Gallery", path: "/videogallery", icon: <FaVideo /> },
    { name: "Testimonials", path: "/testimonials", icon: <FaComment /> },
    { name: "Offer", path: "/offer", icon: <FaGift /> },
    { name: "Inquiry", path: "/inquiry", icon: <FaEnvelope /> },
    { name: "Services", path: "/services", icon: <FaTools /> },
    { name: "Appointment", path: "/appointment", icon: <FaCalendar /> },
    { name: "Redirection", path: "/redirection", icon: <FaRandom /> },
    { name: "Media", path: "/media", icon: <FaPhotoVideo /> },
    { name: "Our Fact", path: "/our-fact", icon: <FaBalanceScale /> },
    { name: "Our Clinic", path: "/our-clinic", icon: <FaClinicMedical /> },
    { name: "CMS", path: "/cms", icon: <FaFileAlt /> },
  ];

  // ✅ Handle responsiveness when window resizes
  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 768;
      setIsMobile(isNowMobile);
      if (isNowMobile) setOpen(false);
      else setOpen(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* ✅ Toggle button visible on mobile (fixed) */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-blue-900 text-white p-2 rounded-md shadow-lg"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      )}

      <div
        className={`
          bg-blue-900 text-white h-screen p-4 shadow-xl transition-all duration-300 fixed md:static top-0 left-0 z-40
          ${open ? "w-64" : "w-20"} 
          ${isMobile ? (open ? "translate-x-0" : "-translate-x-full") : ""}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://vrajdentalclinic.com/front/images/about_new_4.jpg"
            alt="Logo"
            className="w-28 h-20"
          />
        </div>

        {/* Toggle button for desktop */}
        {!isMobile && (
          <button
            className="text-white text-xl mb-4 text-center w-full"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        )}

        {/* Menu */}
        <ul className="space-y-2 h-[75vh] overflow-y-scroll no-scrollbar">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-800 transition 
                ${location.pathname === item.path ? "bg-blue-800" : ""}`}
                onClick={() => isMobile && setOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>

                {open && <span className="whitespace-nowrap">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
