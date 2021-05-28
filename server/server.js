const express = require("express");
const app = express();

app.use(express.static("public"));

const server = require("http").Server(app);
const io = require("socket.io")(server);

// socket io listen connect
io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

// var arrUsers = [""];

// // socket io listen connect
// io.on("connection", function (socket) {
//   console.log("User connected " + socket.id);

//   // === listen user register ===
//   socket.on("client-send-Username", function (data) {
//     // check register
//     if (arrUsers.indexOf(data) >= 0) {
//       socket.emit("server-send-register-fail"); // fail
//     } else {
//       // success
//       arrUsers.push(data);
//       socket.Username = data;
//       socket.emit("server-send-register-success", data);

//       // server send list user
//       io.sockets.emit("server-send-list-Users", arrUsers);
//     }
//   });

//   // === listen event logout ===
//   socket.on("logout", function () {
//     // logout and delete user logout
//     arrUsers.splice(arrUsers.indexOf(socket.Username), 1);

//     // send all client except the sender
//     socket.broadcast.emit("server-send-list-Users", arrUsers);
//   });

//   // === listen user chat ===
//   socket.on("user-send-message", function (data) {
//     io.sockets.emit("server-send-message", {
//       userName: socket.Username,
//       content: data,
//     });
//   });

//   // === listen event typing chat ===
//   socket.on("users-typing", function () {
//     var inform = socket.Username;
//     socket.broadcast.emit("who-is-typing", inform);
//   });

//   // === listen event stop typing chat ===
//   socket.on("stop-typing", function () {
//     io.sockets.emit("who-is-stop-typing");
//   });
// });

// // router
// app.get("/", function (req, res) {
//   res.render("home");
// });
