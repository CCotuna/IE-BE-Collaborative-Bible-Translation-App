import { User } from "../models/user.model.js";

// Fetch all users
export async function getAllUsers() {
  return await User.findAll({
    attributes: ["id", "username"], 
  });
}

// Create a new user
export async function createUser(username, password) {
  try {
    const newUser = await User.create({ username, password });
    return {
      id: newUser.id,
      username: newUser.username,
      password: newUser.password
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
