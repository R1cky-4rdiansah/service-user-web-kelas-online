const express = require("express");
const router = express.Router();
const handler = require("../routes/handler/users");

router.post("/register", handler.register);

module.exports = router;
