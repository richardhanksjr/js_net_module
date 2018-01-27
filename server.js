// Imports
const net = require('net');
const employeeMod = require('./employeeModule');

// Create a server instance
const server = net.createServer( socket =>{
  console.log("Client connection...".red);
  socket.on('end', () => {
    console.log("Client disconnected...".red);
  });
  /*
  Listen for messages from clients and respond according to the switch
  cases.  Use the employeeModule functionality for doing the data lookup.
  */
  socket.on("data", (data) => {
    console.log(`...Received ${data}`.blue);
    const dataList = data.toString().split(" ");
    switch(dataList[0]){
      case "lookupByLastName":
        const employees = employeeMod.lookupByLastName(dataList[1]);
        socket.write(JSON.stringify(employees));
        break;
      case "addEmployee":
        let employeeId = employeeMod.addEmployee(dataList[1], dataList[2]);
        socket.write(employeeId.toString());
        break;
      case "lookupById":
        const employee = employeeMod.lookupById(parseInt(dataList[1]));
        socket.write(JSON.stringify(employee));
        break;
      default:
        socket.write('"Invalid request"');
    }
  });
}
);

// Start server listening on port 3000
server.listen(3000, () => console.log("Listening for connections"));
