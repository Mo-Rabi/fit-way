// routes/messageRoutes.js
import { Router } from "express";
const router = Router();
import { sendMessage, getMessages } from "./chat.controller.js";

// new chat message
router.post("/chats", sendMessage);

// Retrieve chat messages to user
router.get("/chats/:trainerId", getMessages);


export default router;
