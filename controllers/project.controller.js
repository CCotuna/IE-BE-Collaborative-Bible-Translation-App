import { getAllProjects, createProject } from "../services/project.service.js";

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

// Add a new project
//  const newProject = {
//   title: project.name,
//   descriptions,
//   has_updates: false,
//   type: project.type || "Custom",
//   last_update: formatDateTime(new Date()),
// };

export async function addProject(req, res) {
  const { title, text, type, has_updates } = req.body;
  try {
    const newProject = await createProject(title, text, type, has_updates);
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
