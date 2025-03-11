import { getAllProjects, createProject, deleteOneProject, importBible } from "../services/project.service.js";

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
//   hasUpdates: false,
//   type: project.type || "Custom",
//   last_update: formatDateTime(new Date()),
// };

export async function addProject(req, res) {
  const { title, text, type, hasUpdates, userId } = req.body;
  try {
    const newProject = await createProject(title, text, type, hasUpdates, userId);
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

export const addBibleProject = async (req, res) => {
  const { projectId, version } = req.body;

  if (!projectId || !version) {
    return res.status(400).json({ message: "Project ID and version are required" });
  }

  try {
    await importBible(projectId, version);  
    res.status(200).json({ message: "Bible import completed successfully!" });
  } catch (error) {
    console.error("Error importing Bible:", error);
    res.status(500).json({ error: "Failed to import Bible" });
  }
}