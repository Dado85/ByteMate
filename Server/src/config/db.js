const mongoose=require("mongoose")
async function connectDB() {
  await mongoose.connect(process.env.DB_URL);

}
connectDB()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB connection failed:", err);
  });
  module.exports=connectDB;