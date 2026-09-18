const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    },

    username:{
        required:true,
        type:String,
    },
    password:{
        required:true,
        type:String
    }
 })

 personSchema.pre('save',async function(next){
    const person = this;

    if(!person.isModified('password'))return next();
    try{
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(person.password,salt);

        person.password = hashedPassword;

        next()
    }
    catch(err){
        return next(err);
    }
 })

 personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
 }

 const Person = mongoose.model('Person',personSchema);

 module.exports=Person;