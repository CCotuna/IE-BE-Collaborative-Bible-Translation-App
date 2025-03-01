import { Project } from "../models/project.model.js";

// Fetch all projects
export async function getAllProjects() {
  return await Project.findAll({
    attributes: ["id", "title", "text", "type", "has_updates", "createdAt", "updatedAt", "deletedAt"],
  });
}

// Create a new project
export async function createProject(title, text, type, has_updates) {
  try {
    const newProject = await Project.create({ title, text, type, has_updates });
    return {
      title: newProject.title,
      text: newProject.text,
      type: newProject.type,
      has_updates: newProject.has_updates
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