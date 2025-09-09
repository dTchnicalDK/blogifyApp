import multer from "multer";
import path from "path";
import fs from "fs";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadPath = "./public/uploads/avatars";

//     // Ensure directory exists
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }

//     cb(null, uploadPath);
//   },
//   filename: function (req, file, cb) {
//     // Extract filename without extension
//     const originalName = path.parse(file.originalname).name;
//     const extension = path.extname(file.originalname);

//     // Create clean filename: fieldname_originalName_timestamp.extension
//     const filename = `${
//       file.fieldname
//     }_${originalName}_${Date.now()}${extension}`;

//     cb(null, filename);
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedFiles = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
  if (!allowedFiles.includes(file.mimetype)) {
    cb(new Error("Only image files are allowed"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export default upload;

////////////////////////////////////////////////////old code depricated by user///////////////
// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads/avatars");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname +
//         "_" +
//         file.originalname +
//         Date.now() +
//         path.extname(file.originalname)
//     );
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedFiles = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
//   if (!allowedFiles.includes(file.mimetype)) {
//     cb(new Error("only image files are allowed"), false);
//   } else {
//     cb(null, true);
//   }
// };
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// });
// // console.log("upload result", upload);
// // .single("featuredImage")
// export default upload;
