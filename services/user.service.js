import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

// Fetch all users
export async function getAllUsers() {
  return await User.findAll({
    attributes: ["id", "email"], 
  });
}

// Create a new user
export async function createUser(email, password) {
  try {
    const newUser = await User.create({ email, password });
    return {
      id: newUser.id,
      email: newUser.email,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// Sign in a user
export async function signInUser(email, password) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;
    
    return {
      id: user.id,
      email: user.email
    };
  }
  catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}
