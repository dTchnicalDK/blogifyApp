import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";
// dotenv.config()
(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: "dtek5slnq",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
  });
})();
export default cloudinary;
