import { Router } from "express";
import {
  addUser,
  getUsers,
} from "../controllers/user.controller.js";

const router = Router();

// Route to add a user
router.post("/", addUser);

// Route to get all users
router.get("/", getUsers);

export default router;
