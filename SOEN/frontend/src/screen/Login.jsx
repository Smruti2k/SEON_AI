import React, { useState,useContext } from "react";
import { Link ,useNavigate } from "react-router-dom";
import {UserContext} from "../context/user.context.jsx";

//using axios to ingegrate the front end and backend

import axios from "../config/axios.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {setUser} = useContext(UserContext);

  function submitHandler(e) {
    //prevents some default functionality of the button
    e.preventDefault();
    axios
      .post("/users/login", { email, password })
      .then((res) => {
        console.log(res.data);

        localStorage.setItem('token', res.data.token)
        setUser(res.data.user);

        navigate('/')
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 w-full rounded-lg shadow-lg p-8 max-w-lg border border-gray-600">
        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Registered Email"
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Don't have an Account?{" "}
          <Link
            to="/register"
            className="text-indigo-500 hover:text-indigo-400"
          >
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
