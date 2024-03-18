const express = require('express');
const router = express.Router();

const {Sendmessage, LineTest} = require("../cons/line.js");

router.post("/", Sendmessage);

module.exports = router;
