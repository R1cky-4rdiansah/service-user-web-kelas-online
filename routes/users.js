const express = require("express");
const router = express.Router();
const handler = require("../routes/handler/users");

router.post("/register", handler.register);
router.post("/login", handler.login);
router.put("/:id", handler.update);
router.get("/:id", handler.getUser);
router.post("/logout", handler.logout);

module.exports = router;
