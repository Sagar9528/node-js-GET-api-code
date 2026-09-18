const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem')


router.post('/',async (req,res)=>{
    try{
        const menuitems = req.body

        const menudata = new MenuItem(menuitems);

        const response = await menudata.save();

        console.log('data saved successfully',response);

        res.status(200).json(response);
    }
    catch(err){
        console.log('error occured',err)

        res.status(500).json({error:'error is find'})
    }
})

router.get('/',async(req,res)=>{
    try{
        const data= await MenuItem.find();
        console.log("data fetched",data);
        res.status(200).json(data); 
    }
    catch(err){
        console.log("error occured",err)
        res.status(500).json({error:"error occured"})
    }
})

router.get('/:taste',async (req,res)=>{
    try{
        const taste = req.params.taste;

        if(taste == "sweet" || taste == "spicy" || taste == "sour"){
            const response = await MenuItem.find({taste:taste});
            console.log('data fetched');

            res.status(200).json(response);
        }else{
            res.status(400).json({error:'invalid taste'})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'internal error'})
    }
})




module.exports = router;