const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();
const { Users } = require("../../../models");

module.exports = async (req, res) => {
  const schema = {
    name: "string|empty:false",
    email: "email|string|empty:false",
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

  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    return res.status(409).json({
      status: "error",
      message: "Email telah digunakan",
    });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  const data = {
    password,
    name: req.body.name,
    email: req.body.email,
    profession: req.body.profession,
    role: "student",
  };

  const save = await Users.create(data);

  return res.json({
    status: "susscess",
    message: "Data telah tersimpan",
    data: {
      id: save.id,
    },
  });
};
