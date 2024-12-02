import { Router } from "express";
import { verifyJWT } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
import { createblog, getAllBlogs } from "../controllers/blog.controller.js";
const router = Router()

router.route("/createblog").post(verifyJWT , upload.fields([
    {
        name: "image",
        maxCount: 1,
    }
]),createblog)

router.route("/bloglist").get(verifyJWT,getAllBlogs)

export default router