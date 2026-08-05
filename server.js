const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get("/api/config", (req, res) => {
    res.json({ clientId: process.env.CLIENT_ID || "1534238453871673414" });
});

let players = {};
io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);
    players[socket.id] = { id: socket.id, x: 100, y: 100 };
    socket.emit("currentPlayers", players);
    socket.broadcast.emit("newPlayer", players[socket.id]);

    socket.on("move", (data) => {
        if (players[socket.id]) {
            players[socket.id].x = data.x;
            players[socket.id].y = data.y;
            io.emit("playerMoved", players[socket.id]);
        }
    });

    socket.on("disconnect", () => {
        delete players[socket.id];
        io.emit("playerDisconnected", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server running: http://localhost:3000");
});

