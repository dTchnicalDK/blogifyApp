import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: " ",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userLoginRespose = await axios.post(
        "http://localhost:2000/api/user/login",
        formData,
        { withCredentials: true }
      );
      navigate("/");
      console.log("userCreationRespose", userLoginRespose?.data.msg);
      // console.log("Login data", formData);
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
            Login Here
          </h2>

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

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
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
