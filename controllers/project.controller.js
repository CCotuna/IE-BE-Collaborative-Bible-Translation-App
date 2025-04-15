import { getAllProjects, createProject, deleteOneProject, addNewCollaborator } from "../services/project.service.js";

export async function getProjects(req, res) {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const projects = await getAllProjects(userId)
    res.status(200).json(projects);

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

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

export async function deleteProject(req, res) {
  const { projectId } = req.body;
  if (!projectId)
    throw new Error("Project ID is required");

  await deleteOneProject(projectId);
  res.send("Project deleted successfully");
}


export async function addCollaborator(req, res) {
  const { email, projectId } = req.body;

  if (!email || !projectId) {
    return res.status(400).json({ message: "Email and Project ID are required." });
  }

  try {
    const result = await addNewCollaborator(email, projectId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error adding collaborator:", error.message);
    res.status(500).json({ message: error.message });
  }
}