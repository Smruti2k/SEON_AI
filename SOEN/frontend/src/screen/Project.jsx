import { useState, useEffect,useRef, useContext } from "react";
import React from "react";
import axios from "../config/axios.js";
import { useLocation } from "react-router-dom";
import {
  initializeSocket,
  receiveMessage,
  sendMessage,
} from "../config/socket.js";

import { UserContext } from "../context/user.context";

const Project = () => {
  //use location is used to access the state defined in use navigate to pason the project details without using props

  const location = useLocation();
  // console.log(location.state);
  //here the project ensures that the project details are captured in this const variable now i can access that simply as project_id
  const project = location.state?.project;
  const [isSidePannelOpen, setisSidePannelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [projects, setProjects] = useState(project);
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const messageBox = React.createRef()

  const handelUserClick = (id) => {
    setSelectedUserId((prevSelectedUserId) => {
      //This is a callback that React provides with the previous state value (prevSelectedUserId). Using this ensures the new state is calculated correctly, even if multiple updates happen in quick succession.
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }
      // console.log(newSelectedUserId);

      return newSelectedUserId;
    });
  };

  //this adds users to the project in backend or makes the api call
  function addCollaborators() {
    axios
      .put("/project/add-user", {
        projectId: project._id,
        user: Array.from(selectedUserId),
      })
      .then((res) => {
        //
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //this function will handel to send the message
  const  send = ()=> {
    
    sendMessage("project-message", { message, sender: user});

    appendOutGoingingMessage(message);
    

    setMessage("");
    scrollToBottom();
  }

  // this function call needs to be loaded every time the page reloads thus axios call inside useEffect for getting all the users
  useEffect(() => {
    initializeSocket(project._id);


    receiveMessage("project-message", (data) => {
      console.log(data);
      appendIncomingMessage(data);
    });


    axios
      .get(`project/getProject/${project._id}`)
      .then((res) => {
        // console.log(res.data.project);
        setProjects(res.data.project);
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get("/users/all")
      .then((res) => {
        setUsersData(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  function appendIncomingMessage(messageObject){
    const messageBox = document.querySelector('.message-box')

    const message = document.createElement('div')
    message.classList.add('message','max-w-56','flex','flex-col','pg-2','bg-slate-50','w-fit','rounded-md','p-2')
    message.innerHTML = `<small class= 'opacity-55 text-xs'>${messageObject.sender.email}</small>
    <p class='text-sm'>${messageObject.message}</p>`

    messageBox.appendChild(message);
    scrollToBottom();
  }

  function appendOutGoingingMessage(message){
    const messageBox = document.querySelector('.message-box')

    const newMessage = document.createElement('div')
    newMessage.classList.add('message','ml-auto','max-w-56','flex','flex-col','pg-2','bg-slate-50','w-fit','rounded-md','p-2')
    newMessage.innerHTML = `<small class= 'opacity-55 text-xs'>${user.email}</small>
    <p class='text-sm'>${message}</p>`

    messageBox.appendChild(newMessage);
    
  }

  function scrollToBottom() {
    messageBox.current.scrollTop = messageBox.current.scrollHeight
}

  return (
    <main className="h-screen w-screen flex ">
      <section className="left relative h-full min-w-96 bg-slate-300 flex flex-col">
        <header className="flex justify-between items-center p-2 px-4 w-full bg-slate-100 absolute top-0">
          <button onClick={() => setIsModalOpen(true)} className="flex gap-2 ">
            <i className="ri-add-line absolute top-4"></i>
            <div className="pl-5 mt-0.5">
              <small>Collaborators</small>
            </div>
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-2 rounded-md shadow-md w-1/4">
                <div className="flex items-center pt-1 justify-between pb-2 ">
                  <h3 className="px-2 ">Users</h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-1">
                    <i className="ri-close-circle-fill"></i>
                  </button>
                </div>
                <div className="users-list flex flex-col justify-center gap-2 mb-3 max-h-96 overflow-auto ">
                  {usersData.map((e) => (
                    <div
                      key={e._id}
                      className={`p-2 ml-1 flex gap-2  text-sm font-semibold rounded-md hover:bg-slate-300 ${
                        Array.from(selectedUserId).indexOf(e._id) != -1
                          ? "bg-slate-300"
                          : ""
                      } cursor-pointer`}
                      onClick={() => handelUserClick(e._id)}
                    >
                      <i className="ri-user-6-fill"></i>
                      <p className=" ">{e.email}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center pt-3">
                  <button
                    onClick={addCollaborators}
                    className="px-4 py-2 border text-sm bg-blue-300 rounded-md hover:bg-blue-500"
                  >
                    Add Collaboraters
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setisSidePannelOpen(!isSidePannelOpen)}
            className="hover: cursor-pointer px-2 py-1 rounded-md border border-slate-400"
          >
            <i className="ri-group-line"></i>
          </button>
        </header>
        <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">
          <div 
          ref={messageBox}
          className="message-box p-1 flex-grow flex flex-col gap-1 overflow-auto max-h-full scrollbar-hide">
            
            
          </div>
          <div className="input-Field w-full flex absolute bottom-0 l">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-1 px-3  w-5/6 focus:outline-none border-none rounded-sm "
              type="text"
              placeholder="enter message"
            />
            <button
              onClick={send}
              className="flex-grow border border-slate-300 bg-black text-white rounded-sm"
            >
              <i className="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
        <div
          className={`sidePanel w-full h-full bg-slate-50 flex flex-col gap-1 absolute top-0 transition-all  ${
            isSidePannelOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <header className="flex justify-between p-2 px-3 bg-slate-300">
            <h1 className="text-lg font-semibold">Members</h1>
            <button onClick={() => setisSidePannelOpen(!isSidePannelOpen)}>
              <i className="ri-close-line"></i>
            </button>
          </header>

          <div className="users flex flex-col gap-2 p-1">
            {projects.user &&
              projects.user.map((e) => {
                return (
                  <div className="user flex gap-2 items-center cursor-pointer hover:bg-slate-200 p-2 rounded-sm">
                    <div className="aspect-square rounded-full flex w-fit h-fit items-center justify-center p-4 bg-slate-700">
                      <i className="ri-user-3-fill absolute"></i>
                    </div>
                    <h1 className="username  text-lg">{e.email}</h1>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Project;
