import React, { useState, useEffect } from "react";
import { UserContext } from "../context/user.context.jsx";
import { useContext } from "react";
import axios from "../config/axios.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const [project, setProject] = useState([]);
  const navigate = useNavigate();

  function createProject(e) {
    e.preventDefault();

    console.log({ projectName });
    axios
      .post("/project/create", { name: projectName })
      .then((res) => {
        console.log(res);
        alert("Sucess");
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get("/project/all")
      .then((res) => {
        setProject(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className=" h-screen p-4">
      <div className="Projects flex">
        <button
          className="Project p-4 border border-slate-300 rounded-md hover:bg-indigo-200"
          onClick={() => setIsModalOpen(true)}
        >
          New Project
          <i className="ri-link ml-2"></i>
        </button>
        {project.map((e) => (
          <div
            key={e._id}
            onClick={() => {
              navigate(`/project`, { state: { project } });
            }}
            className="p-4 border flex flex-col  gap-2 border-slate-300 rounded-md ml-2 cursor-pointer min-w-52 hover:bg-indigo-200"
          >
            <h2 className="font-semibold">{e.name}</h2>
            {/* number of users in this project or collaborators */}
            <div className="flex gap-2">
              <p>
                <small>
                  <i className="ri-user-fill mr-1"></i>Collaborators :
                </small>
              </p>

              {e.user.length}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-xl mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
