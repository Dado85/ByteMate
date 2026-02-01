const multer=require("multer");
const storage=multer.diskStorage({
  destination(req,file,cb){
    cb(null,"uploads");
  },
  filename(req,file,cb){
    const filename=file.originalname;
    cb(null,filename);
  }
})
const uploadFile = multer({ storage }).single("file");

module.exports = uploadFile;


