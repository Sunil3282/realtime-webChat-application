// Node server Which will handle socketio connection
const express = require('express');
const socket = require('socket.io')
 const port = 8000;

 const app = express()
 const server = app.listen(port,()=>{
    console.log(`Server is listen on port: ${port}`)
 })

const io = socket(server,{
    cors:{
        origen : ["http://localhost:5500"]
    }
});
 const users = {};
//io.on is the instant of socket.io
 io.on('connection', socket =>{
    //console.log("make socket connection");
    socket.on("new-user-joint",name =>{
        //console.log("New User is:",name);
        users[socket.id] = name;
        socket.broadcast.emit("user-joint",name)
    })

    socket.on("send",message =>{
        socket.broadcast.emit('receive',{message:message,name : users[socket.id]})
    })

    socket.on("disconnect",message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
 })