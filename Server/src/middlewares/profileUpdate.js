const { validateProfileData } = require("../validation");

const validateProfileUpdate = (req, res, next) => {
  try {
  

    const result = validateProfileData.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map(e => ({
        field: e.path.join("."),
        message: e.message,
      }));
      return res.status(400).json(errors);
    }

    // Attach validated data
    req.validateBody = result.data;
    next();
  } catch (err) {
    return res.status(400).json([
      { field: "body", message: "Invalid request body" }
    ]);
  }
};

module.exports = validateProfileUpdate;
