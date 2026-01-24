//const math = require("./maths");
//import { add, subtract } from "./maths.js";
//console.log(math.add(6, 7));
//module.exports = { add, subtract };

const http = require("http");

const server = http.createServer((req, res) => {
  //req:Incoming request (method,url, headers)
  //res:Outgoing response (write.end)
  if (req.method === "GET" && req.url === "/") {
    //manual route check
    res.writeHead(200, { "Content-Type": "text/plain" }); //manual headers
    res.end("Hello from Raw Node.js!"); //send body & close
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found :("); //basic error
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Raw server running on http://localhost:${PORT}`);
});
