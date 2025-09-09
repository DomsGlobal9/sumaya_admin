import React, { useState } from "react";
import sumayalogo from "../assets/Logo (1).svg";
import sideimg from "../assets/LoginImg.png";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Static admin credentials
  const adminEmail = "pallav@gmail.com";
  const adminPassword = "Sumaya@12233";

  const handleSubmit = (e) => {
  e.preventDefault();
  if (email === adminEmail && password === adminPassword) {
    localStorage.setItem("adminToken", "sample_admin_token"); // ✅ store token
    navigate("/admin", { replace: true }); // ✅ prevent going back to /login
  } else {
    setError("Invalid email or password");
  }
};

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-evenly"
      style={{ fontFamily: "Poppins" }}
    >
      {/* Left Side - Login Form */}
      <div className="max-w-md w-full p-4 sm:p-8">
        <div className="space-y-2">
          {/* Logo */}
          <div className="flex items-center">
            <img src={sumayalogo} alt="logo" />
          </div>

          {/* Login Form */}
          <div className="mt-8 space-y-6">
            <div>
              <h2
                className="text-3xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: "Poltawski Nowy" }}
              >
                Admin Login
              </h2>
              <p className="text-gray-600 text-sm">Welcome Back Admin 👋</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="login@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm pr-10"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

              {/* Sign In Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
                >
                  Sign In
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-8">
              <p className="text-center text-xs text-gray-500">
                © 2025 ALL RIGHTS RESERVED
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image (Hidden on mobile) */}
      <div className="hidden lg:block">
        <img src={sideimg} alt="loginimg" className="w-[400px] h-[440px]" />
      </div>
    </div>
  );
}
