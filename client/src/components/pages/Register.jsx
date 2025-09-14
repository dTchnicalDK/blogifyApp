import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import FirebaseLoginComp from "../firebase/FirebaseLoginComp";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //validation if password and repassword matches
    if (formData.password !== formData.rePassword) {
      return toast.error("password don't match");
    }
    try {
      const userCreationRespose = await axios.post(
        "http://localhost:2000/api/user/register",
        formData
      );
      console.log("userCreationRespose", userCreationRespose?.data.msg);
    } catch (error) {
      console.log("user registration error (frontend): ", error);
    }
  };
  return (
    <div>
      {" "}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Register Here
          </h2>

          <div className=" w-2/3 flex flex-col justify-center items-center m-auto">
            <FirebaseLoginComp />
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password Again
              </label>
              <input
                type="password"
                name="rePassword"
                required
                minLength={6}
                // pattern="^(?=.*[A-Z])(?=.*\d).+$"
                // title="Must include at least one CAPITAL LETTER and a NUM13ER"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                value={formData.rePassword}
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
            Already have an account?
            <Link
              to={"/login"}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              {" "}
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
