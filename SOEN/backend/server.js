import "dotenv/config.js";
import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { query } from "express";
import mongoose from "mongoose";
import projectModel from "./models/project.model.js";
import { generateResult } from "./services/ai.service.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.use(async (socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers.authorization?.split(" ")[1];

    const projectId = socket.handshake.query.projectId;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return next(new Error("Invalid Project Id"));
    }

    socket.project = await projectModel.findById(projectId);

    if (!token) {
      return next(new Error("Authentication Error"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return next(new Error("Authentication Error"));
    }

    socket.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
});

io.on("connection", (socket) => {
  socket.roomId = socket.project._id.toString();
  console.log("User connected:", socket.id);

  socket.join(socket.roomId);

  socket.on("project-message", async (data) => {
    const message = data.message;

    const ifMessageIncludesAI = message.includes("@ai");

    if (ifMessageIncludesAI) {
      const prompt = message.replace("@ai", "");

      const result = await generateResult(prompt);
      console.log({"result": result})

      io.to(socket.roomId).emit("project-message", {
        message: result,
        sender: {
          _id: "ai",
          email: "AI",
        },
      });
      return;
    }

    socket.broadcast.to(socket.roomId).emit("project-message", data);
  });

  // socket.onAny((event, data) => {
  //   console.log(`Event received: ${event}`, data); // Log the raw data
  // });

  // Handle disconnection
  socket.on("disconnect", (reason) => {
    console.log("User disconnected:", socket.id, "Reason:", reason);
    socket.leave(socket.roomId);
  });
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
