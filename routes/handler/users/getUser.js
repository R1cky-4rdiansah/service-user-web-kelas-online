const { Users } = require("../../../models");

module.exports = async (req, res) => {
  const id = req.params.id;

  const User = await Users.findByPk(id, {
    attributes: ["id", "name", "email", "profession", "avatar"],
  });

  if (!User) {
    return res.status(400).json({
      status: "error",
      message: "Akun tidak ditemukan",
    });
  }

  return res.json({
    status: "success",
    data: User,
  });
};
