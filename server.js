const express = require('express')
const app = express();

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

app.listen(3000,()=>{
    console.log("server is running")}
);