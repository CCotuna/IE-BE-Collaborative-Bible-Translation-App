import { Router } from "express";
import {
  addProject,
  getProjects,
  deleteProject,
  addBibleProject,
} from "../controllers/project.controller.js";

const router = Router();

// Route to get all projects
router.get("/", getProjects);
router.post("/", addProject);
router.delete("/", deleteProject);

router.post("/bibleImport", addBibleProject);

export default router;
