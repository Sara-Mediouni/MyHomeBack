const express=require('express')
const router=express.Router()
const UserController=require('../Controllers/UserController')
const multer = require('multer');
const images = multer({dest: '../images/'})
const path=require('path');
const Storage = multer.diskStorage({
  destination: "images",
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    callback(null,Date.now()+'_'+name);
  }
});
const upload=multer({storage:Storage}).single('Image')

router.post('/login',UserController.login)
router.post('/signup',UserController.signup)





module.exports =router