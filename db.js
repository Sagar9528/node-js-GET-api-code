const mongoose =require('mongoose');

const url='mongodb+srv://yt-backend-hello-world:Sagar%40123@my-cluster.y9tjbux.mongodb.net/?appName=my-cluster/db1'

mongoose.connect(url)

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('connected to db')
});

db.on('error',(err)=>{
    console.log("connection error",err);
});

db.on('disconnected',()=>{
    console.log("disconnected");
});

module.exports =db;