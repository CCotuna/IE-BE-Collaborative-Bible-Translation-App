import { Router } from "express";
import {
  addUser,
  getUsers,
  signIn,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.post("/", addUser);
router.post("/signin", signIn);

export default router;
