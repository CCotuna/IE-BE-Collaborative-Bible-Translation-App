import { createUser, getAllUsers, signInUser } from "../services/user.service.js";

// Add a new user
export async function addUser(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await createUser(username, password);
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

// Sign in a user
export async function signIn(req, res) {
  try {
    const { username, password } = req.body;
    console.log("signIn -> username", username)

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await signInUser(username, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
