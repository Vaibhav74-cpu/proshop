import express from "express";
import singleUpload from "../middleware/multer.js";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

router.route("/").post(singleUpload, uploadImage);

export default router;
