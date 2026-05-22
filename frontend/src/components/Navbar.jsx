import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    navigate("/");
  };

  return (

    <div className="w-[260px] h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white fixed left-0 top-0 p-6 border-r border-slate-800 shadow-2xl">

      <h1 className="text-4xl font-extrabold mb-12 text-cyan-400 tracking-wide">

        Enterprise

      </h1>

      <div className="flex flex-col gap-5">

        <Link
          to="/dashboard"
          className="bg-slate-800 hover:bg-cyan-600 p-4 rounded-2xl transition duration-300 text-lg font-semibold shadow-lg"
        >
          Dashboard
        </Link>

        {
          role !== "employee" && (

            <Link
              to="/create-task"
              className="bg-slate-800 hover:bg-cyan-600 p-4 rounded-2xl transition duration-300 text-lg font-semibold shadow-lg"
            >
              Create Task
            </Link>
          )
        }

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 p-4 rounded-2xl text-lg font-semibold transition duration-300 shadow-lg mt-4"
        >
          Logout
        </button>

      </div>

      <div className="absolute bottom-8 left-6 right-6">

        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">

          <p className="text-gray-400 text-sm">
            Logged in as
          </p>

          <h2 className="text-cyan-400 text-xl font-bold capitalize mt-1">
            {role}
          </h2>

        </div>

      </div>

    </div>
  )
}

export default Navbar;