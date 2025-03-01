import { getAllProjects, createProject, deleteOneProject } from "../services/project.service.js";

// Get all projects
export async function getProjects(req, res) {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const projects = await getAllProjects(userId)
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
  const { title, text, type, has_updates, userId } = req.body;
  try {
    const newProject = await createProject(title, text, type, has_updates, userId);
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Delete a project
export async function deleteProject(req, res) {
  const { projectId } = req.body;
  if(!projectId)
    throw new Error("Project ID is required");

  await deleteOneProject(projectId);
  res.send("Project deleted successfully");
}