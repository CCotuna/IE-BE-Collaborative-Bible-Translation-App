import { Project } from "../models/project.model.js";

// Fetch all projects
export async function getAllProjects() {
  return await Project.findAll({
    attributes: ["id"],
  });
}