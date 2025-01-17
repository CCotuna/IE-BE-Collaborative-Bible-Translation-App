import { getAllProjects } from "../services/project.service.js";

// Get all projects
export async function getProjects(req, res) {
  try {
    const projects = await getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", projects);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
