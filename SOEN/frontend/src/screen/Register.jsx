import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "../config/axios.js";
import axiosInstance from "../config/axios.js";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function submitHandler(e) {
    //prevents some default functionality of the button
    e.preventDefault();

    axios
      .post("/users/register", { email, password })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  return (
    <div className="bg-gray-900 h-screen flex justify-center items-center">
      <div className="bg-gray-800 w-full max-w-lg p-8 rounded-lg border border-gray-600">
        <h2 className="text-white font-bold text-2xl mb-6">Register</h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="example@email.com"
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></input>
          </div>
          <div>
            <label className="block text-sm text-gray-400" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter New Password"
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></input>
          </div>
          <button
            type="register"
            className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already Have an Account?{" "}
          <Link to="/login" className="text-indigo-500 hover:text-indigo-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
