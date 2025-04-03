const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/authController");

// /api/login
router.post("/login", login);

// /api/logout
router.post("/logout", logout);

module.exports = router;
