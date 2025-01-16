import { io } from "socket.io-client";

let socketInstance = null;

/**
 * Initializes the Socket.IO connection and returns the instance.
 */
export const initializeSocket = (projectId) => {
    if (!socketInstance) {
        // Create the socket connection
        socketInstance = io(import.meta.env.VITE_API_URL, {
            auth: {
                token: localStorage.getItem("token"),
            },
            query:{
                projectId
            }
        });

        // Add a connection event listener
        socketInstance.on("connect", () => {
            console.log("Connected to server:", socketInstance.id);

            
        });

        // Handle connection errors
        socketInstance.on("connect_error", (err) => {
            console.error("Connection error:", err.message);
        });

        // Handle disconnect events
        socketInstance.on("disconnect", (reason) => {
            console.warn("Disconnected from server:", reason);
        });
    }

    return socketInstance;
};

export const receiveMessage = (eventName , cd) =>{
    socketInstance.on(eventName,cd);
}

export const sendMessage = (eventName,data) => {
    socketInstance.emit(eventName,data);
}


