import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee"
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

      await API.post("/auth/register", formData);

      alert("Registration Successful");

      navigate("/");

    } catch {

      alert("Registration Failed");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl w-[450px]"
      >

        <h1 className="text-4xl text-white font-bold text-center mb-8">
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-4 rounded-xl mb-5 bg-slate-800 text-white outline-none"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl mb-5 bg-slate-800 text-white outline-none"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl mb-5 bg-slate-800 text-white outline-none"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full p-4 rounded-xl mb-5 bg-slate-800 text-white outline-none"
          onChange={handleChange}
        >

          <option value="employee">
            Employee
          </option>

          <option value="manager">
            Manager
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

        <button
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-xl text-lg font-bold"
        >
          Register
        </button>

      </form>

    </div>
  )
}

export default Register