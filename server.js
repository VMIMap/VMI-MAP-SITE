const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const players = {};

app.get('/', (req, res) => {
    res.send('VMI MAP SERVER ONLINE');
});

io.on('connection', (socket) => {

    console.log('Player connected:', socket.id);

    socket.on('playerJoin', (data) => {

        if (!data || !data.id) return;

        players[data.id] = {
            id: data.id,
            name: data.name || 'Player',
            avatar: data.avatar || '',
            x: Number(data.x) || 0,
            y: Number(data.y) || 0
        };

        socket.playerId = data.id;

        socket.emit('players', players);

        socket.broadcast.emit(
            'playerJoined',
            players[data.id]
        );
    });

    socket.on('playerMove', (data) => {

        if (!data || !data.id) return;

        if (!players[data.id]) return;

        players[data.id].x =
            Number(data.x) || 0;

        players[data.id].y =
            Number(data.y) || 0;

        socket.broadcast.emit(
            'playerMoved',
            {
                id: data.id,
                x: players[data.id].x,
                y: players[data.id].y
            }
        );
    });

    socket.on('chatMessage', (data) => {

        if (!data || !data.text) return;

        io.emit('chatMessage', {
            id: data.id,
            name: data.name || 'Player',
            text: data.text
        });
    });

    socket.on('disconnect', () => {

        const id = socket.playerId;

        if (id && players[id]) {

            delete players[id];

            io.emit(
                'playerLeft',
                id
            );
        }

        console.log(
            'Player disconnected:',
            socket.id
        );
    });

});

const PORT =
    process.env.PORT || 3000;

server.listen(PORT, '0.0.0.0', () => {

    console.log(
        'VMI MAP SERVER RUNNING ON PORT ' + PORT
    );

});
