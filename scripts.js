import { sequelize } from "./db.js";
import { Project } from "./models/project.model.js";

const addProjects = async () => {
  try {
    await sequelize.sync();

    const projects = [
      {
        title: "AI-Powered Translator",
        text: "A web application that translates and annotates text using AI.",
        type: "Web App",
        hasUpdates: true,
      },
      {
        title: "Task Manager",
        text: "A simple task management system with reminders and notifications.",
        type: "Mobile App",
        hasUpdates: false,
      },
      {
        title: "E-Commerce Platform",
        text: "A platform for buying and selling products online with multiple payment options.",
        type: "Web App",
        hasUpdates: true,
      },
    ];

    await Project.bulkCreate(projects);
    console.log("Projects added successfully!");
  } catch (error) {
    console.error("Error adding projects:", error);
  } finally {
    await sequelize.close();
  }
};

addProjects();

// await Project.restore({ where: {} });