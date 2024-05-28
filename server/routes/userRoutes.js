const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// POST /api/users
router.post("/", userController.createUser);
// GET /api/users
router.get("/", userController.getAllUsers);

module.exports = router;
