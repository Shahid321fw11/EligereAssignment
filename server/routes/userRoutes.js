const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// POST /api/users
router.post("/", userController.createUser);

module.exports = router;
