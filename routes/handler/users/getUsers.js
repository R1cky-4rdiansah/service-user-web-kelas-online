const { Users } = require("../../../models");

module.exports = async (req, res) => {
  const userIds = req.query.user_ids || [];

  const sqlOption = {
    attributes: ["id", "name", "email", "profession", "avatar"],
  };

  if (userIds.length > 0) {
    sqlOption.where = {
      id: userIds,
    };
  }

  const users = await Users.findAll(sqlOption);

  return res.json({
    status: "success",
    data: users,
  });
};
