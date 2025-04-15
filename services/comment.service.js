import { Comment } from "../models/comment.model.js";

export async function createComment({ content, status, fragmentId, userId, userEmail }) {
    const comment = await Comment.create({
        content, 
        status,   
        fragmentId,
        userId, 
        userEmail,  
    });

    return comment;  
}
