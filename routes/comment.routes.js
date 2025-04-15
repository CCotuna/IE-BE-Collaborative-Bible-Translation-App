import { Router } from "express";

import { addComment } from "../controllers/comment.controller.js";

const router = Router();

router.post("/", addComment);

export default router;
