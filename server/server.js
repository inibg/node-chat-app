const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });

    socket.on('createMessage', (newMessage, callback) => {
        console.log('createMessage', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback('Server Info');
       /* socket.broadcast.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });
        */
    });

});

server.listen(port, () => {
    console.log(`Server is up in port ${port}`);
});
