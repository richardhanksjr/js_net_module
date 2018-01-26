
const net = require('net');
const readline = require('readline');
const colors = require('colors');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const readMessage  = (client) => {
  rl.question("Enter Command: ", (line) => {
    client.write(line);
    if (line === "bye") client.end();
    else readMessage(client);
  });
};


const client = net.connect({port:3000}, () => {
  console.log("Connected to server");
  readMessage(client);
});

client.on("end", () => {
  console.log("Client disconnected");
  return;
});

client.on("data", (data) => {
  // let dataString = data.toString();
  var dataString = data.toString();
  console.log(`...Received:\n ${data}`.blue);
  // console.log(`...Received: ${dataString}`.blue);

  // client.end();
});
