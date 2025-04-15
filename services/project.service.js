import { Project } from "../models/project.model.js";
import { Fragment } from "../models/fragment.model.js";
import { Comment } from "../models/comment.model.js";

import axios from "axios";

// Fetch all projects
export async function getAllProjects(userId) {
  const where = userId ? { userId: parseInt(userId, 10) } : {};

  try {
    return await Project.findAll({
      where,
      attributes: ["id", "title", "type", "hasUpdates", "userId", "createdAt", "updatedAt"],
      include: [{
        model: Fragment,
        as: 'fragments',
        attributes: ['id', 'content', 'verseNumber'],
        include: [
          {
            model: Comment,
            as: 'comments',
            attributes: ['id', 'content', 'userId', 'userEmail']
          }
        ]
      }],
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

// Create a new project
export async function createProject(title, text, type, hasUpdates, userId) {
  const transaction = await Project.sequelize.transaction();

  try {
    const newProject = await Project.create({
      title,
      type,
      hasUpdates,
      userId
    }, { transaction });

    // Împarte textul pe ENTER în fragmente
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');

    // Creează fragmentele
    const fragmentPromises = lines.map((line, index) => {
      return Fragment.create({
        content: line,
        verseNumber: index + 1,
        projectId: newProject.id
      }, { transaction });
    });

    await Promise.all(fragmentPromises);
    await transaction.commit();

    return newProject;
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating project with fragments:", error);
    throw error;
  }
}

export async function deleteOneProject(projectId) {
  try {
    await Fragment.destroy({ where: { projectId } })
    await Project.destroy({ where: { id: projectId } });
  } catch (error) {
    console.error("Error deleting project and its fragments:", error);
    throw error;
  }
}

