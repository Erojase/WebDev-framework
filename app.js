const fs = require("fs");
const http = require("http");
const { startLiveReload } = require("./modules/liveReload");
const { ConfigLoader } = require("./modules/configLoader");
const { renderHTML } = require("./modules/htmlRender");

const config = new ConfigLoader().config;
const host = config.host;
const port = config.port;
const indexPath = "./src/index.html";

const requestListener = function(req, res) {
    res.writeHead(200);
    res.end(renderHTML(indexPath, config));
}


const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    require('child_process').exec(`start http://${host}:${port}`);
    startLiveReload(requestListener);
});
