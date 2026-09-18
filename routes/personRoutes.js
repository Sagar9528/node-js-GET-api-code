const express = require('express');
const router = express.Router();
const Person = require('../models/Person');


router.post('/',async(req,res)=>{
   try{
        const data = req.body

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved',response);
        res.status(200).json(response);
   }
   catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'})
   }
})

router.get('/',async(req,res)=>{
    try{
            const data = await Person.find();
            console.log('data fetched');
            res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server err'})
    }
})

router.get('/:workType',async(req,res)=>{
    try{
        const workType = req.params.workType;

        if(workType == "chef" || workType == "manager"  || workType == "waiter"){
            const response = await Person.find({work:workType});
            console.log("response fetched");

            res.status(200).json(response);
        }else{
            res.status(400).json({error:"invalid work typr"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"intyernal server error"})
    }
})


router.put('/:id',async (req,res)=>{
    try{
        const person_id = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(person_id,updatedPersonData,{
            new: true,
            runValidators: true,
        })

        if(!response){
            return res.status(404).json({error:'person not found'})
        }
        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'inteernal error'})
    }
})


router.delete('/:id',async(req,res)=>{
    try{
        const personid = req.params.id;

        const response = await Person.findByIdAndDelete(personid);

        if(!response){
            return res.status(404).json({error:"person not find"});
        }
        else{
            console.log('data deleted')
            res.status(200).json({message:'person delete succress'});
        }
    }
    catch(err){
            console.log(err);
            res.status(500).json({error:'internal server error'});
    }
})
module.exports=router;