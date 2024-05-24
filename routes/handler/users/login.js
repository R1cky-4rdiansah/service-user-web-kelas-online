const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();
const { Users } = require("../../../models");

module.exports = async (req, res) => {
  const schema = {
    email: "email|string|empty:false",
    password: "string|min:8|empty:false",
  };

  const valid = v.validate(req.body, schema);

  if (valid.length) {
    return res.status(400).json({
      status: "error",
      message: valid,
    });
  }

  const findUser = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!findUser) {
    return res.status(404).json({
      status: "error",
      message: "Akun tidak ditemukan",
    });
  }

  const data = {
    id: findUser.id,
    name: findUser.name,
    email: findUser.email,
    role: findUser.role,
    profession: findUser.profession,
    avatar: findUser.avatar,
  };

  const compare = await bcrypt.compare(req.body.password, findUser.password);

  if (!compare) {
    return res.status(404).json({
      status: "error",
      message: "Akun tidak ditemukan",
    });
  }

  return res.json({
    status: "success",
    message: "Login berhasil",
    data,
  });
};
