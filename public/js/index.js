var socket = io();
socket.on('connect', function() {
    console.log('connected to server');
    socket.emit('createMessage', {
        from: "Jen@example.com",
        text: "Hey, this is Andrew"
    });
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('got new Message', message);
});

