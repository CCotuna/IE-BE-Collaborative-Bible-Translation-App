import { Project } from "../models/project.model.js";

// Fetch all projects
export async function getAllProjects(userId = null) {
  const where = userId ? { userId} : {}

  return await Project.findAll({
    where,
    attributes: ["id", "title", "text", "type", "has_updates", "userId", "createdAt", "updatedAt", "deletedAt"],
  });
}

// Create a new project
export async function createProject(title, text, type, has_updates, userId) {
  try {
    const newProject = await Project.create({ title, text, type, has_updates, userId });
    return {
      title: newProject.title,
      text: newProject.text,
      type: newProject.type,
      has_updates: newProject.has_updates,
      userId: newProject.userId,
    };
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

export async function deleteOneProject(projectId) {
  try {
    await Project.destroy({ where: { id: projectId } });
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}