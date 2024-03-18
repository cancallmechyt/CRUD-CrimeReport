const express = require('express');
const db = require('./db'); 
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const bcrypt = require('bcrypt');
const cors = require('cors')
const axios = require('axios')
const app = express();
//fix Cors
app.use(cors({ origin: 'http://localhost:4000' })) // http://localhost:4000 phpmyaddmin , https://crime-beta3.vercel.app 
app.use(express.json())

const userRouters = require("./routes/user")
const postRouters = require("./routes/post")
const lineRouters = require("./routes/line")

app.use("/users", userRouters)
app.use("/post", postRouters)
app.use("/line", lineRouters)

app.get('/', (req, res) => {
  console.log('Test Connect!!')
  res.send('Success')
})

// Start Server at PORT 5000
app.listen('5000', () => {
  console.log('Server started on port 5000');
});
