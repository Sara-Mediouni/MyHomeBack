const User=require('../Models/User');
const fs=require('fs')
const multer=require('multer')

var jwt = require('jsonwebtoken');
var sha1 = require('sha1');
const path=require('path');
var ObjectId = require('mongodb').ObjectId;
var a=[];


const signup=(req,res,next)=>{
  
    User.findOne({ Email: req.body.Email }).then((result)=>{

        if (result === null ) {
            // we can add the new user
            let user = {
                Email: req.body.Email,
                Password: sha1(req.body.Password ) // save password plain text ? we save passwords 
            }
            User.insertOne( user ).then((resultInsert)=>{

                res.send({success:true, message:"Account created successfully."})

            }).catch((err)=>{
                res.send({success:false, message:"Something went wrong"})
            })
        }else{
            res.send({success:false, message:"Username is already in use."})
        }

         
    }).catch((err)=>{
        res.send({success:false, message:"Something went wrong"})
    })


}

const login=(req, res, next)=>{

    User.findOne({ Email:req.body.Email, Password : sha1(req.body.Password) }).then((r)=>{

        if (r !== null) {
            // generate a new token
            var token  = jwt.sign({
                user:r,
        
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + ((60 * 60 ) * 24 ) , // 24 hours
        
              },
              'abcd'
              )
        
              res.send( { succes:true, token:token } );

        }else{
            res.send({succes:false, message:"wrong username or password"})
        }
    }).catch((err)=>{
        res.send({succes:false, message:"Something went wrong"})
    })

}


module.exports={
    login,signup
}