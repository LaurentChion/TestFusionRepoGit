const http = require('http');
const WebSocketServer = require('ws').Server;
const express = require('express');

const port = 1234;
const host = '0.0.0.0';

// create a new HTTP server to deal with low level connection details
//  (tcp connections, sockets, http handshakes, etc.)
const server = http.createServer();

// create a new HTTP framework to deal with high level details (routing, cookies, forms data, etc.)
const app = express();

// create a WebSocket Server on to of the HTTP server to deal with the WebSocket protocol
const wss = new WebSocketServer({
  server, // server: server même chose que server ES6
});

// Configure the express (the http framework) to serve static files located in the 'public/' folder
app.use(express.static('public'));
server.on('request', app);

// create a function to me able do broadcast messages to all WebSocket connected clients
wss.broadcast = function broadcast(message) {
  wss.clients.forEach((client) => {
    client.send(message);
  });
};

// Register a listener for new connections on the WebSocket.
wss.on('connection', (client) => {
  // retrieve the name in the cookies
  const cookies = client.upgradeReq.headers.cookie.split(';');
  let wsname = cookies.find((c) => {
    return c.match(/^\s*wsname/) !== null;
  });
  wsname = wsname.split('=')[1];

  // greet the newly connected user
  client.send(`Welcome, ${decodeURIComponent(wsname)}!`);

  // Register a listener on each message of each connection
  client.on('message', (message) => {
    const cli = `[${decodeURIComponent(wsname)}]`;
    console.log(`message from ${cli}`);
    // when recieving a message, broadcast it to all the connected clients
    wss.broadcast(cli + message);
  });
});


// http sever starts listenning on given host and port.
server.listen(port, host, () => {
  console.log(`Listening on ${server.address().address} : ${server.address().port}`);
});
