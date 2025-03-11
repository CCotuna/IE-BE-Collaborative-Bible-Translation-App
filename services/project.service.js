import { Project } from "../models/project.model.js";
import { BibleBook } from "../models/bible.book.model.js";
import { BibleChapter } from "../models/bible.chapter.model.js";
import { Fragment } from "../models/fragment.model.js";

import axios from "axios";

// Fetch all projects
export async function getAllProjects(userId = null) {
  const where = userId ? { userId} : {}

  return await Project.findAll({
    where,
    attributes: ["id", "title", "text", "type", "hasUpdates", "userId", "createdAt", "updatedAt", "deletedAt"],
  });
}

// Create a new project
export async function createProject(title, text, type, hasUpdates, userId) {
  try {
    const newProject = await Project.create({ title, text, type, hasUpdates, userId });
    return newProject;
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

export const getAllBibleBooks = async (version) => {
  try {
    const response = await axios.get(`https://bible-api.com/books?translation=${version}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Bible books:", error);
    throw new Error("Failed to fetch Bible books");
  }
};

export const getChapters = async (book, version) => {
  try {
    const response = await axios.get(`https://bible-api.com/${book}?translation=${version}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching chapters for ${book}:`, error);
    throw new Error(`Failed to fetch chapters for ${book}`);
  }
};

export const importBible = async (projectId, version) => {
  const books = await getAllBibleBooks(version);

  for (let book of books) {
    const bibleBook = await BibleBook.create({ title: book.name, projectId });

    const chapters = await getChapters(book.name, version);
    for (let chapter of chapters) {
      const bibleChapter = await BibleChapter.create({ title: chapter.number, bibleBookId: bibleBook.id });

      for (let fragment of chapter.verses) {
        await Fragment.create({ text: fragment.text, bibleChapterId: bibleChapter.id, projectId });
      }
    }
  }
};