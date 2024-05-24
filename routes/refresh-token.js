const express = require("express");
const router = express.Router();
const handler = require("./handler/refresh-token");

router.post("/", handler.create);
router.get("/", handler.getToken);

module.exports = router;
