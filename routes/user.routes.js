import { Router } from "express";
import {
  addUser,
  getUsers,
  signIn,
} from "../controllers/user.controller.js";

const router = Router();

// Route to add a user
router.post("/", addUser);

// Route to get all users
router.get("/", getUsers);
router.post("/signin", signIn);

export default router;
