const express = require('express')
const app = express()
const userrouter = require('./routes/user')
const productrouter = require('./routes/product')
const cors = require("cors")

require("dotenv").config();
app.use(cors());

app.use(express.json());

app.use('/user',userrouter);
app.use('/product',productrouter);

app.listen(8000, (req, res) => {
    console.log('listening on 8000') })