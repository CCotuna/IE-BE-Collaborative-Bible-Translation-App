import { Router } from "express";
import {
  addProject,
  getProjects,
  deleteProject,
  addCollaborator,
} from "../controllers/project.controller.js";

const router = Router();

router.get("/", getProjects);
router.post("/", addProject);
router.delete("/", deleteProject);

router.post("/add-collaborator", addCollaborator);

export default router;
