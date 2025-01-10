import { useState } from "react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Project = () => {
  //use location is used to access the state defined in use navigate to pason the project details without using props

  const location = useLocation();
  //   console.log(location.state);
  const [isSidePannelOpen, setisSidePannelOpen] = useState(false);

  return (
    <main className="h-screen w-screen flex ">
      <section className="left relative h-full min-w-96 bg-slate-300 flex flex-col">
        <header className="flex justify-end p-2 px-4 w-full bg-slate-100">
          <button
            onClick={() => setisSidePannelOpen(!isSidePannelOpen)}
            className="hover: cursor-pointer px-2 py-1 rounded-md border border-slate-400"
          >
            <i className="ri-group-line"></i>
          </button>
        </header>
        <div className="conversation-area flex flex-col flex-grow">
          <div className="message-box flex-grow flex flex-col p-1 gap-1">
            <div className="message flex flex-col bg-slate-50 w-fit rounded-md p-2 max-w-56">
              <small className="opacity-55 text-xs">example</small>
              <p className="text-sm">
                nt unde, mollitia deserunt inventore quae? Assumenda!
              </p>
            </div>
            <div className="ml-auto message flex flex-col bg-slate-50 w-fit rounded-md p-2 max-w-56">
              <small className="opacity-55 text-xs">example</small>
              <p className="text-sm">
                cipit quam veritatis illo cum aperiam iste sit debitis?
              </p>
            </div>
          </div>
          <div className="input-Field w-full flex">
            <input
              className="p-1 px-3  w-5/6 focus:outline-none border-none rounded-sm "
              type="text"
              placeholder="enter message"
            />
            <button className="flex-grow border border-slate-300 bg-black text-white rounded-sm">
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
        <div
          className={`sidePanel w-full h-full bg-slate-50 flex flex-col gap-1 absolute top-0 transition-all  ${
            isSidePannelOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <header className="flex justify-end  p-2 px-3 bg-slate-300">
            <button onClick={() => setisSidePannelOpen(!isSidePannelOpen)}>
              <i className="ri-close-line"></i>
            </button>
          </header>

          <div className="users flex flex-col gap-2 p-1">
            <div className="user flex gap-2 items-center cursor-pointer hover:bg-slate-200 p-2 rounded-sm">
              <div className="aspect-square rounded-full flex w-fit h-fit items-center justify-center p-4 bg-slate-700">
                <i className="ri-user-3-fill absolute"></i>
              </div>
              <h1 className="username font-semibold text-lg">username</h1>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Project;
