const express = require('express')
const prisma = require('../client/prisma')
const {signupvalidator, signinvalidator} = require('../validators/user')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()


router.post('/signup',signupvalidator, async (req, res) => {
    const error = validationResult(req)
   if (!error.isEmpty()){
     return res.status(401).json({message: error.array()})
   }
  try { 
   const user = await prisma.User.create({data: req.body})
  return res.json({data : user})
  }
  catch (err) {
    return res.status(500).json({message: err.message})
  }
})


router.post('/signin',signinvalidator, async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()){
    return res.status(401).json({message: error.array()})
  } 
  const user = await prisma.User.findUnique({where : {username : req.body.username}})
  if(!user){
  return res.status(500).json({message: "invalid user or password"})
  }
   const validate = await bcrypt.compare(req.body.password, user.password);
   if(!validate){
    return res.status(500).json({message: "invalid user or password"})
   }
    const token = jwt.sign({
     username : user.username,
     id : user.id},
       process.env.JWT_SECRET,
     {expiresIn: '1h'}
    ) 
    return res.json({token : token})  
})



module.exports = router