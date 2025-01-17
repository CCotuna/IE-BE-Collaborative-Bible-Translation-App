import { createUser, getAllUsers } from "../services/user.service.js";

// Add a new user
export async function addUser(req, res) {
  try {
    const { username, password, customId } = req.body;

    // Validate request body
    if (!username || !password || !customId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await createUser(username, password, customId);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get all users
export async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
