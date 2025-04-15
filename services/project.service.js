import { Project } from "../models/project.model.js";
import { Fragment } from "../models/fragment.model.js";
import { Comment } from "../models/comment.model.js";
import { UserAccess } from "../models/user.access.model.js";
import { User } from "../models/user.model.js";

import { Op } from 'sequelize';

import axios from "axios";

export async function getAllProjects(userId) {
  try {
    return await Project.findAll({
      attributes: ["id", "title", "type", "hasUpdates", "userId", "createdAt", "updatedAt"],
      include: [
        {
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
        },
        {
          model: User,
          as: 'collaborators',
          attributes: ['id', 'email'],
          through: {
            attributes: ['role']
          }
        }
      ],
      where: {
        [Op.or]: [
          { userId: parseInt(userId, 10) },
          { '$collaborators.id$': parseInt(userId, 10) }
        ]
      }
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export async function createProject(title, text, type, hasUpdates, userId) {
  const transaction = await Project.sequelize.transaction();

  try {
    const newProject = await Project.create({
      title,
      type,
      hasUpdates,
      userId
    }, { transaction });

    await UserAccess.create({
      userId,        
      projectId: newProject.id, 
      role: "owner", 
    }, { transaction });

  
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== '');

  
    const fragmentPromises = lines.map((line, index) => {
      return Fragment.create({
        content: line,
        verseNumber: null,
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
    const fragments = await Fragment.findAll({ where: { projectId } });

    const fragmentIds = fragments.map(f => f.id);
    if (fragmentIds.length > 0) {
      await Comment.destroy({ where: { fragmentId: fragmentIds } });
    }

    await Fragment.destroy({ where: { projectId } });

    await UserAccess.destroy({ where: { projectId } });

    await Project.destroy({ where: { id: projectId } });

  } catch (error) {
    console.error("Error deleting project and related data:", error);
    throw error;
  }
}

export async function addNewCollaborator(email, projectId) {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("User with this email does not exist.");
  }

  const existing = await UserAccess.findOne({
    where: {
      userId: user.id,
      projectId: projectId
    }
  });

  if (existing) {
    throw new Error("User already has access to this project.");
  }

  await UserAccess.create({
    userId: user.id,
    projectId,
    role: "collaborator"
  });

  return { message: "Collaborator added successfully" };
}

