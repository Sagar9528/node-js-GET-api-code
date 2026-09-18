const express = require('express')
const app = express();
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/MenuItem',menuItemRoutes);


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