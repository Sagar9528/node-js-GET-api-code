const express = require('express')
const app = express();
const db = require('./db')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const localAuthMiddleware = passport.authenticate('local',{session:false})


const Person = require('./models/person')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const logRequest = (req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request Made To : ${req.originalUrl}`);
    next();
}

app.use(logRequest);
passport.use(new LocalStrategy(async (username,password,done)=>{
    try{
        console.log('received credential',username,password);
        const user =await Person.findOne({username:username});
        if(!user)
            return done(null,false,{message:'incorrect username'});
        const isPasswordMatch = user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:'incorrect password'});
        }
    }
    catch(err){
        return done(err);
    }
}))

app.use(passport.initialize());

const personRoutes = require('./routes/personRoutes');
app.use('/person',localAuthMiddleware ,personRoutes);

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


app.get('/',(req,res)=>{
    res.send('welcome...to my hotel')
})












app.listen(3000,()=>{
    console.log("server is running")}
);