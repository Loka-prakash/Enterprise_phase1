import { useState } from "react";

import Navbar from "../components/Navbar";

import API from "../api/axios";

function CreateTask() {

  const [formData, setFormData] = useState({

    title: "",

    description: "",

    priority: "medium",

    due_date: "",

    assigned_to_id: ""
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

      const payload = {

        ...formData,

        assigned_to_id: Number(
          formData.assigned_to_id
        )
      };

      await API.post(
        "/tasks",
        payload
      );

      alert("Task Created Successfully");

      setFormData({

        title: "",

        description: "",

        priority: "medium",

        due_date: "",

        assigned_to_id: ""
      });

    } catch (error) {

      console.log(error.response?.data);

      alert("Task Creation Failed");
    }
  };

  return (

    <div className="flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">

      <Navbar />

      <div className="ml-[260px] w-full flex justify-center items-center p-10">

        <form
          onSubmit={handleSubmit}
          className="bg-slate-800/90 backdrop-blur-lg border border-slate-700 p-10 rounded-3xl shadow-2xl w-[600px]"
        >

          <h1 className="text-5xl text-cyan-400 font-extrabold mb-10 text-center">
            Create Task
          </h1>

          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Enter Task Title"
            className="w-full p-4 rounded-2xl mb-5 bg-slate-700 text-white outline-none border border-slate-600 focus:border-cyan-400"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            value={formData.description}
            placeholder="Enter Task Description"
            rows="4"
            className="w-full p-4 rounded-2xl mb-5 bg-slate-700 text-white outline-none border border-slate-600 focus:border-cyan-400"
            onChange={handleChange}
          />

          <select
            name="priority"
            value={formData.priority}
            className="w-full p-4 rounded-2xl mb-5 bg-slate-700 text-white border border-slate-600 outline-none focus:border-cyan-400"
            onChange={handleChange}
          >

            <option value="low">
              Low Priority
            </option>

            <option value="medium">
              Medium Priority
            </option>

            <option value="high">
              High Priority
            </option>

          </select>

          <input
            type="datetime-local"
            name="due_date"
            value={formData.due_date}
            className="w-full p-4 rounded-2xl mb-5 bg-slate-700 text-white outline-none border border-slate-600 focus:border-cyan-400"
            onChange={handleChange}
          />

          <input
            type="number"
            name="assigned_to_id"
            value={formData.assigned_to_id}
            placeholder="Enter Employee User ID"
            className="w-full p-4 rounded-2xl mb-8 bg-slate-700 text-white outline-none border border-slate-600 focus:border-cyan-400"
            onChange={handleChange}
            required
          />

          <button
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition duration-300 text-white p-4 rounded-2xl text-xl font-bold shadow-lg"
          >
            Create Task
          </button>

        </form>

      </div>

    </div>
  )
}

export default CreateTask;