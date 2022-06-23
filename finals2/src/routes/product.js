const express = require('express')
const prisma = require("../client/prisma")
const {productvalidator} = require("../validators/product")
const {authmiddleware} = require("../middleware/jwt")
const {validationResult} = require('express-validator')

const Router = express.Router()

Router.post('/addproduct',authmiddleware,productvalidator, async (req, res) => {
 const error = validationResult(req)
  if(!error.isEmpty()){
 return res.status(401).json({error: error})
}
    try{
       const product = await prisma.Products.create({ data: {
        name : req.body.name, 
        ownerid : Number(req.user.id)  } })
    return res.json({product: product})
         }
    
         catch(error) {
        return res.json({error: error})
    }
});


module.exports = Router;