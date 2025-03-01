import { Router } from "express";
import {
  addProject,
  getProjects,
  deleteProject,
} from "../controllers/project.controller.js";

const router = Router();

// Route to get all projects
router.get("/", getProjects);
router.post("/", addProject);
router.delete("/", deleteProject);

export default router;
