import { createComment } from "../services/comment.service.js";

export async function addComment(req, res) {
    try {
        const { content, status, fragmentId, userId, userEmail } = req.body;

        console.log("Content:", content);
        console.log("Status:", status);
        console.log("Fragment ID:", fragmentId);
        console.log("User ID:", userId);
        console.log("User Email:", userEmail);

        if (!content || !status || !fragmentId || !userId || !userEmail) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newComment = await createComment({
            content,
            status,
            fragmentId,
            userId,
            userEmail,
        });

        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}