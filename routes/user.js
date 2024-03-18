const express = require('express');
const router = express.Router();

const { getUser, addUser} = require("../cons/user.js");

router.get("/profile/:userId", getUser);
router.post("/register", addUser);

module.exports = router;