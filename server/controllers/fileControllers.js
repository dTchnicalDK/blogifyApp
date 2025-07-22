import cloudinary from "../configurations/cloudinaryConfig.js";
import upload from "../configurations/multerConfiguration.js";
import { handleError } from "../helper/errorHandler.js";

export const uploadAvtar = async (req, res, next) => {
  console.log("route hit");
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "blogify",
      resource_type: "auto",
    });
    if (!uploadResult) {
      return next(handleError(500, "Error! could not upload to cloudinary"));
    }
    console.log("file uploaded at : ", uploadResult.secure_url);
    res
      .status(201)
      .json({ message: "file uploaded to cloudinary successfully" });
  } catch (error) {
    next(handleError(error.status || 500, error.message));
  }
};
//   upload(req, res, (err) => {
//     if (err) {
//       res.status(400).json({ error: err });
//     } else {
//       if (req.file == undefined) {
//         res.status(400).json({ error: "No file selected" });
//       } else {
//         res.json({
//           message: "File uploaded successfully",
//           file: `uploads/avatars/${req.file.filename}`,
//         });
//       }
//     }
//   });
// };
//   let {  avtarName, avtarImage } = req.body;
//grab form data

//   try {
//     //validate for empty and already registered
//     if (!email || !password) {
//       return res.status(200).json({ msg: "fill all the fields first" });
//     }
//     const isUserAlredyRegistered = await User.findOne({ email });
//     if (isUserAlredyRegistered) {
//       return res
//         .status(200)
//         .json({ msg: "user already registered, please login" });
//     }
//     //hash password
//     const hashedPwd = await bcrypt.hash(password, 8);
//     password = hashedPwd;
//     //save to database and create user
//     const createdUser = await User.create({ email, password });
//     res.status(200).json({
//       msg: "user registered successfully",
//       // user: createdUser.select("- password"),
//     });
//   } catch (error) {
//     console.log("user registration error", error);
//   }
