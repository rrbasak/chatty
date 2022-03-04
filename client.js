const socket=io()
let textarea=document.querySelector('#textarea')
let send=document.querySelector('.imgg')
let msgarea=document.querySelector('.message_area')
let namee;
do{
    namee=prompt("enter your name")
}while(!namee)


socket.emit('newuser',namee)


socket.on('entry',(text)=>{
    let el=document.createElement('div')
    el.setAttribute('class','update')
    el.innerText=text
    msgarea.appendChild(el)
})

window.onclose = function () {
    socket.emit('exituser',namee)
};

socket.on('leave',(text)=>{
    let el=document.createElement('div')
    el.setAttribute('class','update')
    el.innerText=text
    msgarea.appendChild(el)
})

textarea.addEventListener('keyup',(e)=>{
    e.preventDefault()
    if(e.key=='Enter'){
        sendMessage(e.target.value)
    }
})
send.addEventListener('click',(e)=>{
    e.preventDefault()
    sendMessage(textarea.value)
})

function sendMessage(message){
    let msg={
        user:namee,
        message:message.trim()
    }

    //append
    appendmessage(msg,'outgoing')
    textarea.value=""
    scrolltoBottom()

    //send to server
    socket.emit('message',msg)
}

function appendmessage(msg,type){
    let mkdiv=document.createElement('div')
    let classname=type
    mkdiv.classList.add(classname,'message')

    let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mkdiv.innerHTML=markup
    msgarea.appendChild(mkdiv)
}



// function appendjoin(msgs,type){
//     const messageelement=document.createElement('div');
//     messageelement.innerText=msgs;
    
//     messageelement.classList.add(type)
//     messageContainer.append(messageelement)
// }

//receive msg

socket.on('messagee',(msg)=>{
    appendmessage(msg,'incoming')
    scrolltoBottom()
})

function scrolltoBottom(){
    msgarea.scrollTop=msgarea.scrollHeight
}


