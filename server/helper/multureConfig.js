// import multer from "multer";
// import fs from "fs";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/uploads/avatars");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// // Init upload
// export const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 }, // 1MB limit
// }).single("avatar"); // 'avatar' is the field name in the form
