import { User } from "../models/user.model.js";

// Fetch all users
export async function getAllUsers() {
  return await User.findAll({
    attributes: ["id", "username", "customId"], 
  });
}

// Create a new user
export async function createUser(username, password, customId) {
  try {
    const newUser = await User.create({ username, password, customId });
    return {
      id: newUser.id,
      username: newUser.username,
      customId: newUser.customId,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
