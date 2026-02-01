const { v2: cloudinary } = require("cloudinary");
const fs=require("fs");
const uploadonCloudinary = async (file) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image",
    });
    fs.unlinkSync(file)
    return result.secure_url;
    
  } catch (error) {
    fs.unlinkSync(file)
    console.error(error);
  }
};
module.exports= uploadonCloudinary;
