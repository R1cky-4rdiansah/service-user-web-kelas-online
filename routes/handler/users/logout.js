const { Users, RefreshToken } = require("../../../models");

module.exports = async (req, res) => {
  const userId = req.body.user_id;

  const user = await Users.findByPk(userId);

  if (!user) {
    return res.status(400).json({
      status: "erros",
      message: "Akun tidak ditemukan",
    });
  }

  await RefreshToken.destroy({
    where: {
      user_id: userId,
    },
  });

  return res.json({
    status: "success",
    message: "Refresh token terhapus",
  });
};
