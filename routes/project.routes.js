import { Router } from "express";
import {
  addProject,
  getProjects,
  deleteProject,
  addComment,
} from "../controllers/project.controller.js";

const router = Router();

router.get("/", getProjects);
router.post("/", addProject);
router.delete("/", deleteProject);

export default router;
