import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  //where to save images
  destination(req, file, cb) {
    //cb=>call back
    cb(null, "uploads/"); //save in uploads folder
  },
  //what name of files
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

function checkFileType(file, cb) {
  if (!file) {
    return cb(new Error("Please upload a file"));
  }
  const filetypes = /jpg|jpeg|png/; //allowed extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); //check extension - jpg/png...
  const mimetype = filetypes.test(file.mimetype); //image/..jpg
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Imges only");
  }
}

const upload = multer({
  storage,
  fileFilter: checkFileType,
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image Uploaded",
    image: `/${req.file.path}`,
  });
});

export default router;
