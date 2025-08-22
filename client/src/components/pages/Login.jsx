import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget the CSS
import { userContext } from "../../contexts/UserContexProvider";
import FirebaseLoginComp from "../firebase/FirebaseLoginComp";
import siteLogo from "@/assets/logo2.jpg";

function Login() {
  const { loggedUser, login } = useContext(userContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: " ",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userLoginRespose = await axios.post(
        "http://localhost:2000/api/user/login",
        formData,
        { withCredentials: true }
      );
      if (!userLoginRespose.data.user) {
        throw new Error("login failure");
      }
      // setting user inside user context
      login(userLoginRespose.data.user);
      navigate("/udashboard");
      toast.success(userLoginRespose.data.msg, { position: "top-right" });
    } catch (error) {
      console.log("user registration error (frontend): ", error);
      toast.error(error.response?.data?.msg || "login failed", {
        position: "top-center",
      });
    }
  };

  if (loggedUser) {
    // return <Navigate to={"/udashboard"} />;
    return <Navigate to={"/user"} />;
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-2 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-4">
          <div className="upper-side flex justify-start items-center">
            <div className="w-18 ">
              <Link to={"/"}>
                <img src={siteLogo} alt="logo" className="rounded-full" />
              </Link>
            </div>

            <div className="g-login-section w-2/3 flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold text-gray-500 mb-2 text-center">
                Login Here
              </h2>
              <FirebaseLoginComp />
            </div>
          </div>
          <div className="relative flex justify-center border-b-2 border-b-slate-400 mb-10 pb-5">
            <span className="absolute bottom-[-10px] bg-white px-2 rounded-full">
              or
            </span>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                // pattern="^(?=.*[A-Z])(?=.*\d).+$" //insures at least one capital letter and a nuber
                // title="Must include at least one CAPITAL LETTER and a NUM13ER"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center"></label>
            </div>

            <button className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-2.5 rounded-lg transition-colors">
              Submit Now
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Not yet registered ?
            <Link
              to={"/register"}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              {" "}
              Register now !
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
