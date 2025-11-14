import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie'
import Cookies from "js-cookie";
import axios from "axios";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loading, setloading] = useState(false);
  const nav = useNavigate();
  
  const handleSubmit = async() => {
    setloading(true);
    try{
    const checkuser = await axios.post('http://localhost:8081/user/login', {
      email: email,
      password: password
    });
    if(checkuser.data.success === true){
        nav('/dashboard');
        Cookies.set("email", checkuser.data.data.email);
        alert(checkuser.data.message)
    }
    else{
      alert(checkuser.data.message);
    }
  }
  catch(err){
    alert(err.message);
  }
  finally{
    setloading(false)
  }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">

    
     

      {/* Login Card Centered */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-xl border">

          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Login
          </h2>

          <div onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
             onClick={handleSubmit}
              className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition"
            >
              {loading ? "Wait..." : "Login"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
