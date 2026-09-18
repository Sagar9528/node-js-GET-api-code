const express = require('express')
const app = express();
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem')

app.get('/sagar',(req,res)=>{
    var sagar_info={
        name:'sagar',
        age: 25,
        add:'sre',
        is_student:true,
        is_job:false,
    }
    res.send(sagar_info);
})

app.get('/hotel',(req,res)=>{
    res.send('welcome...to my hotel')
})

app.post('/person',async(req,res)=>{
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

app.get('/person',async(req,res)=>{
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


app.post('/MenuItem',async (req,res)=>{
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


app.get('/MenuItem',async(req,res)=>{
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

app.listen(3000,()=>{
    console.log("server is running")}
);