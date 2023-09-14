const fs = require("fs");
const http = require("http");

const host = "localhost";
const port = 3000;


const requestListener = function(req, res) {
    res.writeHead(200);
    res.end(fs.readFileSync("./src/index.html", "utf-8"));
}


const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    require('child_process').exec(`start http://${host}:${port}`);
});
