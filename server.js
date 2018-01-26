const net = require('net');
const employeeMod = require('./employeeModule');

const server = net.createServer( socket =>{
  console.log("Client connection...".red);
  socket.on('end', () => {
    console.log("Client disconnected...".red);
  });
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

server.listen(3000, () => console.log("Listening for connections"));
