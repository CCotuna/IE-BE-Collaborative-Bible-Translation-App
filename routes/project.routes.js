import { Router } from "express";
import {
  addProject,
  getProjects,
} from "../controllers/project.controller.js";

const router = Router();

// Route to get all projects
router.get("/", getProjects);
router.post("/", addProject);

export default router;
