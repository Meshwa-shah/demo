import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { FaMale } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AdminLayout() {
  const nav = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (Cookies.get("email") === undefined) {
      nav("/login");
    }
  }, []);
 function logout(){
   if(window.confirm("Are you sure you want to logout")){

    Cookies.remove("email");
    nav("/login");
   }
 }
  return (
    <div className="flex h-screen w-full overflow-y-hidden overflow-x-auto">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

     
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="relative z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* ✅ Right Side */}
      <div className="flex-1 flex flex-col">

        {/* ✅ Top Navbar */}
        <header className="w-full h-16 bg-white shadow flex items-center justify-between px-6">

          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          <h1 className="text-xl font-semibold">Admin Panel</h1>

          <div className="flex items-center gap-4">
            <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 px-5">
              <p className="" onClick={() => logout()}>Logout</p>
            </button>
          </div>
        </header>

        {/* ✅ Page Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
