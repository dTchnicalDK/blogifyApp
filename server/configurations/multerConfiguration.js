// multerConfiguration.js
import multer from "multer";

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
