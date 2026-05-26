import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import API from "../api/axios";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [editingTaskId, setEditingTaskId] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    priority: "",
    status: ""
  });

  const role = localStorage.getItem("role");

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      const response = await API.get("/tasks");

      setTasks(response.data);

    } catch (error) {

      console.log(error.response?.data);

      alert("Failed To Load Tasks");
    }
  };

  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      alert("Task Deleted");

      fetchTasks();

    } catch (error) {

      console.log(error.response?.data);

      alert("Delete Failed");
    }
  };

  const startEdit = (task) => {

    setEditingTaskId(task.id);

    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status
    });
  };

  const handleChange = (e) => {

    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const updateTask = async (id) => {

    try {

      await API.put(
        `/tasks/${id}`,
        editData
      );

      alert("Task Updated Successfully");

      setEditingTaskId(null);

      fetchTasks();

    } catch (error) {

      console.log(error.response?.data);

      alert("Update Failed");
    }
  };

  return (

    <div className="flex bg-slate-950 min-h-screen text-white">

      <Navbar />

      <div className="ml-[260px] w-full p-10">

        <h1 className="text-5xl font-bold text-cyan-400 mb-10">
          Dashboard
        </h1>

        {
          tasks.length === 0 ? (

            <div className="bg-slate-800 p-10 rounded-3xl text-center text-2xl">
              No Tasks Available
            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {
                tasks.map((task) => (

                  <div
                    key={task.id}
                    className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-2xl"
                  >

                    {
                      editingTaskId === task.id ? (

                        <div className="flex flex-col gap-4">

                          <input
                            type="text"
                            name="title"
                            value={editData.title}
                            onChange={handleChange}
                            className="p-3 rounded-xl bg-slate-700"
                          />

                          <textarea
                            name="description"
                            value={editData.description}
                            onChange={handleChange}
                            className="p-3 rounded-xl bg-slate-700"
                          />

                          <select
                            name="priority"
                            value={editData.priority}
                            onChange={handleChange}
                            className="p-3 rounded-xl bg-slate-700"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>

                          <select
                            name="status"
                            value={editData.status}
                            onChange={handleChange}
                            className="p-3 rounded-xl bg-slate-700"
                          >
                            <option value="todo">Todo</option>
                            <option value="in_progress">
                              In Progress
                            </option>
                            <option value="done">
                              Done
                            </option>
                          </select>

                          <button
                            onClick={() =>
                              updateTask(task.id)
                            }
                            className="bg-cyan-500 hover:bg-cyan-600 p-3 rounded-xl font-bold"
                          >
                            Save Changes
                          </button>

                        </div>

                      ) : (

                        <>

                          <h2 className="text-3xl font-bold text-cyan-400 mb-4">
                            {task.title}
                          </h2>

                          <p className="text-gray-300 mb-5">
                            {task.description}
                          </p>

                          <div className="flex flex-col gap-3 text-sm">

                            <div className="bg-slate-700 p-3 rounded-xl">
                              Priority: {task.priority}
                            </div>

                            <div className="bg-slate-700 p-3 rounded-xl">
                              Status: {task.status}
                            </div>

                            <div className="bg-slate-700 p-3 rounded-xl">
                              Assigned To: {task.assigned_to_id}
                            </div>

                          </div>

                          {
                            role !== "employee" && (

                              <div className="flex gap-4 mt-6">

                                <button
                                  onClick={() =>
                                    startEdit(task)
                                  }
                                  className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded-xl font-bold"
                                >
                                  Update
                                </button>

                                {
                                  role === "admin" && (

                                    <button
                                      onClick={() =>
                                        deleteTask(task.id)
                                      }
                                      className="w-full bg-red-500 hover:bg-red-600 p-3 rounded-xl font-bold"
                                    >
                                      Delete
                                    </button>
                                  )
                                }

                              </div>
                            )
                          }

                        </>
                      )
                    }

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

    </div>
  )
}

export default Dashboard;