const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");
const session = require("express-session");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.use(session({
    secret: "vmi_secret_key",
    resave: false,
    saveUninitialized: false
}));

const CLIENT_ID = process.env.CLIENT_ID || "1534238453871673414";
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/callback";

app.get("/api/config", (req, res) => {
    res.json({
        clientId: CLIENT_ID
    });
});

app.get("/login", (req, res) => {

    const url =
        `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&scope=identify`;

    res.redirect(url);

});

app.get("/callback", async (req, res) => {

    try {

        const token = await axios.post(
            "https://discord.com/api/oauth2/token",
            new URLSearchParams({
                client_id: 1534238453871673413,
                client_secret: uM-sAnSKxS_MpkKe9kY28Tc3SEu48ITI,
                grant_type: "authorization_code",
                code: req.query.code,
                redirect_uri: https://vmimap.github.io/VMI-MAP-SITE/
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        const accessToken = token.data.access_token;

        const user = await axios.get(
            "https://discord.com/api/users/@me",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        req.session.user = user.data;

        res.redirect("/");

    } catch (err) {

        console.log(err.response?.data || err);

        res.send("Discord OAuth Error");

    }

});

app.get("/me", (req, res) => {

    if (!req.session.user) {
        return res.status(401).json({
            loggedIn: false
        });
    }

    res.json(req.session.user);

});

app.get("/logout", (req, res) => {

    req.session.destroy(() => {
        res.redirect("/");
    });

});

let players = {};

io.on("connection", (socket) => {

    console.log("Player connected:", socket.id);

    players[socket.id] = {
        id: socket.id,
        x: 100,
        y: 100,
        username: "Guest"
    };

    socket.emit("currentPlayers", players);

    socket.broadcast.emit("newPlayer", players[socket.id]);

    socket.on("setUser", (user) => {

        if (!players[socket.id]) return;

        players[socket.id].username =
            user.username || "Guest";

        players[socket.id].avatar =
            user.avatar || "";

        io.emit("playerUpdated", players[socket.id]);

    });

    socket.on("move", (data) => {

        if (!players[socket.id]) return;

        players[socket.id].x = data.x;
        players[socket.id].y = data.y;

        io.emit("playerMoved", players[socket.id]);

    });

    socket.on("disconnect", () => {

        delete players[socket.id];

        io.emit("playerDisconnected", socket.id);

    });

});

server.listen(3000, () => {

    console.log("================================");
    console.log(" VMI Server Running");
    console.log(" http://localhost:3000");
    console.log("================================");

});
