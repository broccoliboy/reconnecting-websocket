// Demo Websocket Server
// 2015-03-08
// Sam Martin

// Simple node websocket server that broadcasts all messages to all connected clients.
// Run this script with in node.js after installing ws (websocket library for node)

// Install ws:
// 'npm install ws'

// Run this file in node.js:
// Navigate to the directory containing this file
// 'node NodeWebSocketServer.js'

var WebSocketServer = require('ws').Server;

var defaultPort = 8000;
if (typeof process.argv[2] == 'undefined') {
  console.log('Unspecified port. Using default.')
  var port = defaultPort;
} else {
  port = +process.argv[2];
}

var wss = new WebSocketServer({port: port});
console.log('Websockets server started on port ' + port);
console.log('Waiting for clients...');

var clientCount = 0;

wss.on('connection', function(socket) {
    clientCount += 1;
    console.log('Client connected.');
    console.log('Total clients connected: ' + clientCount);
    socket.on('message', function(message) {
        console.log(message);
        wss.broadcast(message);
    });
    socket.on('close', function(socket) {
        clientCount -= 1;
        console.log("Client disconnected.");
        console.log('Total clients connected: ' + clientCount);
    });
});

wss.broadcast = function(data) {
    for (var ii in this.clients) {
        this.clients[ii].send(data);
    }
};
