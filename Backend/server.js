const app = require("./app");
const http = require("http");
const PORT = process.env.PORT || 3000;
const socket = require("./socket");

const server = http.createServer(app);

socket.initializeSocketServer(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
