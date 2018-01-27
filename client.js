// Imports
const net = require('net');
const readline = require('readline');
const colors = require('colors');

// Create interface for reading user input from the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt for next command, send response to server, end client if 'bye' received
const readMessage  = (client) => {
  rl.question("Enter Command: ", (line) => {
    client.write(line);
    if (line === "bye") client.end();
    else setTimeout(() => readMessage(client), 1000);
  });
};

// Create new client instance, connected on port 3000
// Use readMessage to get user input and handle communication with server
const client = net.connect({port:3000}, () => {
  console.log("Connected to server");
  readMessage(client);
});

client.on("end", () => {
  console.log("Client disconnected");
  return;
});

// Handle data received from the server
client.on("data", (data) => {
  var dataString = data.toString();
  console.log(`...Received:\n ${data}`.blue);
});
