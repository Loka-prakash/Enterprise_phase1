import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const response = await API.post(
      "/auth/login",
      formData
    );

    localStorage.setItem(
      "token",
      response.data.access_token
    );

    localStorage.setItem(
      "role",
      response.data.role
    );

    navigate("/dashboard");

  } catch {

    alert("Invalid Credentials");
  }
};
  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl w-[420px]"
      >

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Welcome Back
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full p-4 rounded-xl mb-5 bg-slate-800 text-white outline-none"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="w-full p-4 rounded-xl mb-5 bg-slate-800 text-white outline-none"
          onChange={handleChange}
        />

        <button
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white p-4 rounded-xl text-lg font-bold transition"
        >
          Login
        </button>

        <p className="text-center text-gray-300 mt-6">

          No account?

          <Link
            to="/register"
            className="text-cyan-400 ml-2"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  )
}

export default Login