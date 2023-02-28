 const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');

const messageInput = document.getElementById('input');

const messageContainer = document.querySelector('.container');

 var audio = new Audio('tin.mp3')

const append =  (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    console.log(position);
    if(position == 'left'){
         audio.play()
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message)
    messageInput.value = '';
})

const Name = prompt("Enter your name:");
socket.emit('new-user-joint',Name);

socket.on('user-joint',name=>{
append(`${name} joint the chat`,'left')
})

socket.on('receive',data=>{
    append(`${data.name} : ${data.message} `,'left')
})

socket.on('left',name=>{
    append(`${name}: left the chat..`,'left')
})