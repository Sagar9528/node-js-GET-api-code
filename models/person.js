const mongoose = require('mongoose');

 //define the person schema 

 const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
    },
    add:{
        type:String
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    
    salary:{
        type:Number,
        required:true
    }
 })


 const Person = mongoose.model('Person',personSchema);

 module.exports=Person;