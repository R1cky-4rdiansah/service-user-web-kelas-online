const { Users, RefreshToken } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const userId = req.body.user_id;
  const refreshToken = req.body.refresh_token;

  const schema = {
    user_id: "number",
    refresh_token: "string",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const user = await Users.findByPk(userId);

  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "Akun tidak ditemukan",
    });
  }

  const refreshTokenCreate = await RefreshToken.create({
    user_id: userId,
    token: refreshToken,
  });

  return res.json({
    status: "success",
    data: { id: refreshTokenCreate.id },
  });
};
