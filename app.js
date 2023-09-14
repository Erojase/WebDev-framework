const fs = require("fs");
const http = require("http");
const { startLiveReload } = require("./modules/liveReload");
const { ConfigLoader } = require("./modules/configLoader");

const config = new ConfigLoader();
const host = "localhost";
const port = config.port;


const requestListener = function(req, res) {
    res.writeHead(200);
    res.end(fs.readFileSync("./src/index.html", "utf-8"));
}


const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    //require('child_process').exec(`start http://${host}:${port}`);
    startLiveReload(requestListener);
});
