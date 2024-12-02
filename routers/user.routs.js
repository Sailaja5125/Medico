import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  currentpasswordChange,
  getCurrentUser,
  updateuseraccount,
  updateavatar,
  getUsersByOccupation,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.js";
import { body } from "express-validator";
import { verifyJWT } from "../middleware/auth.js";

const router = Router();

router.route("/register").post(
  [
    body("username").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  upload.fields([
    // usage of multer middleware to upload files and images
    {
      name: "avatar",
      maxCount: 1,
    }
  ]),
  registerUser
);

// login routes
router.route("/login").post(loginUser);

// logout routes routes
router.route("/logout").post(verifyJWT, logoutUser);
// updating password
router.route("/changepassword").post(verifyJWT, currentpasswordChange);

// get user details 
router.route("/getuser").get(verifyJWT, getCurrentUser);

// update user details
router.route("/userupdate").patch(verifyJWT , updateuseraccount);

// update avatar
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateavatar);
router.route("/doctor").get(getUsersByOccupation)

export default router;
