
const mongoose=require('mongoose');
const Schema=mongoose.Schema
const opts = { toJSON: { virtuals: true } };
const userschema=new Schema({
    Email:{
        type: String,
        trim:true,
    },

    Password:{  
        type: String,
        trim:true,
    },
 
    FirstName:{
        type: String,
        trim:true,
    },
    LastName:{
        type: String,
        trim:true,
    },
        
    
},opts)
module.exports=mongoose.model('User',userschema);
