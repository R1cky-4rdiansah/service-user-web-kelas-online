const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = (req, res) => {
  const schema = {
    name: "string|empty:false",
    email: "string|empty:false",
    profession: "string|optional",
    password: "string|min:8",
  };

  const valid = v.validate(req.body, schema);

  if (valid.length) {
    return res.status(400).json({
      status: "error",
      message: valid,
    });
  }

  return res.json({
    message: "Tervalidasi",
  });
};
