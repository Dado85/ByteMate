const { z } = require("zod");

const gendEnum = z.enum(["male", "female", "others"]);

const validateProfileData = z.object({
  firstName: z.string().min(1, "firstName cannot be empty").max(50).optional(),
  lastName: z.string().max(50).optional(),
  age: z.coerce
    .number({ invalid_type_error: "Please enter your age" })
    .int()
    .gte(18, "Age must be at least 18"),

  gender: z
    .enum(["male", "female", "others"], {
      errorMap: () => ({ message: "Please select your gender" }),
    })
    .optional(),

  about: z
    .string()
    .trim()
    .refine((val) => val.length > 0, "Please add a bio for better connection")
    .optional(),

  skills: z
    .string()
    .trim()
    .refine((val) => val.length > 0, "Please add at least one skill")
    .optional(),

  profession: z
    .string()
    .trim()
    .refine((val) => val.length > 0, "Please add your profession")
    .optional(),
});

module.exports = validateProfileData;
