const bcrypt = require("bcrypt");
const { Users } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

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

  const id = req.params.id;
  const email = req.body.email;

  const findUser = await Users.findByPk(id);

  if (!findUser) {
    return res.status(400).json({
      status: "error",
      massage: "Akun tidak ditemukan",
    });
  }

  if (email) {
    const cekEmail = await Users.findOne({
      where: {
        email,
      },
    });

    if (cekEmail && findUser.email !== email) {
      return res.status(400).json({
        status: "error",
        message: "Email telah digunakan",
      });
    }
  }

  const password = await bcrypt.hash(req.body.password, 10);

  const { name, profession, avatar } = req.body;

  await findUser.update({
    name,
    profession,
    email,
    password,
    avatar,
  });

  return res.json({
    status: "success",
    message: "Data telah terupdate",
    data: {
      id: findUser.id,
      name,
      email,
      profession,
      avatar,
    },
  });
};
