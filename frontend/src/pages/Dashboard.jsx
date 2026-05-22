import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import API from "../api/axios";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

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
                    className="bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-xl hover:scale-105 transition duration-300"
                  >

                    <h2 className="text-2xl font-bold text-cyan-400 mb-4">
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