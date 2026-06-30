import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login } from "../services/auth";

import {
  Eye,
  EyeOff,
  Building2,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const data = await login({
        email,
        password,
      });

      localStorage.setItem(
        "token",
        data.access_token
      );

      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (error: any) {

      console.error(error);

      toast.error(
        error.response?.data?.detail ||
        "Invalid Email or Password"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="flex min-h-screen">

      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-12 text-white">

        <div className="max-w-xl">

          <div className="mb-10 flex items-center gap-5">

            <div className="rounded-2xl bg-white/20 p-5 backdrop-blur">

              <Building2 size={42} />

            </div>

            <div>

              <h1 className="text-4xl font-bold">
                StaffOS
              </h1>

              <p className="text-blue-100">
                Enterprise Workforce Platform
              </p>

            </div>

          </div>

          <h2 className="mb-6 text-5xl font-bold leading-tight">
            StaffOS Enterprise
            <br />
            made simple.
          </h2>

          <p className="text-lg leading-8 text-blue-100">

            Manage employees, attendance,
            payroll, departments, leave requests,
            and analytics through one modern
            enterprise dashboard.

          </p>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex w-full items-center justify-center bg-slate-100 px-6 lg:w-1/2">

        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">

          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">

              <Building2
                size={38}
                className="text-blue-700"
              />

            </div>

            <h2 className="text-3xl font-bold">
              Welcome Back
            </h2>

            <p className="mt-2 text-gray-500">
              Sign in to your account
            </p>

          </div>

          {/* Email */}

          <div className="mb-5">

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Email Address"
              className="h-14 w-full rounded-xl border border-gray-300 px-4 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* Password */}

          <div className="relative mb-8">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Password"
              className="h-14 w-full rounded-xl border border-gray-300 px-4 pr-12 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-blue-600"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Login Button */}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="flex h-14 w-full items-center justify-center rounded-xl bg-blue-600 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            ) : (
              "Login"
            )}
          </button>

          <div className="mt-8 border-t pt-6 text-center">

            <p className="text-sm text-gray-500">
              Enterprise Workforce Management System
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Secure • Fast • Reliable
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}