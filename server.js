const express = require('express')
const app = express();
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/Person');


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
        console.log('data saved');
        res.status(200).json(response);
   }
   catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'})
   }
})

app.listen(3000,()=>{
    console.log("server is running")}
);