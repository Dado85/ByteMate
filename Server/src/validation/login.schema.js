const{z}=require("zod");
const validateLogin=z.object({
  emailId:z.string().email().transform((val) => val.toLowerCase()),
  password:z.string().min(6, "Password must be at least 6 characters")
    .regex(/[@$!%*?&#]/, "Password must contain one special character"),
})
module.exports=validateLogin;