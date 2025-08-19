// import cloudinary from "../configurations/cloudinaryConfig.js";
// import upload from "../configurations/multerConfiguration.js";
// import { handleError } from "../helper/errorHandler.js";

// export const uploadAvtar = async (req, res, next) => {
//   console.log("route hit");
//   try {
//     const uploadResult = await cloudinary.uploader.upload(req.file.path, {
//       folder: "blogify",
//       resource_type: "auto",
//     });
//     if (!uploadResult) {
//       return next(handleError(500, "Error! could not upload to cloudinary"));
//     }
//     console.log("file uploaded at : ", uploadResult.secure_url);
//     res
//       .status(201)
//       .json({ message: "file uploaded to cloudinary successfully" });
//   } catch (error) {
//     next(handleError(error.status || 500, error.message));
//   }
// };
