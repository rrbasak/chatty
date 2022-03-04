const express=require('express')
const app=express()
const http=require('http').createServer(app)
const port=process.env.PORT || 3000




app.use(express.static(__dirname + '/public'));


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

http.listen(port,()=>{
    console.log(`listening on port ${port}`)
})



//socket

const io=require('socket.io')(http)

io.on('connection',socket=>{
    console.log("connected...")

    socket.on('newuser',namee=>{
        console.log('new user joined',namee)
        socket.broadcast.emit('entry',namee+" joined the conversation");
   });
    socket.on('exituser',namee=>{
        console.log('old user left',namee)
        socket.broadcast.emit('leave',namee+" left the conversation");
   });
    socket.on('message',(msg)=>{
        socket.broadcast.emit('messagee',msg) 
    })
})