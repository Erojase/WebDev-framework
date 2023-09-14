const http = require("http");
const { startLiveReload } = require("./modules/liveReload");
const { ConfigLoader } = require("./modules/configLoader");
const { renderHTML } = require("./modules/htmlRender");
const { Router } = require("./modules/router");

const config = new ConfigLoader().config;
const host = config.host;
const port = config.port;
const indexPath = "./src/index.html";
const router = new Router(indexPath);

const requestListener = function(req, res) {
    let page = router.route(req.url);
    res.writeHead(page["status"]);
    res.end(renderHTML(page["path"], config));
}


const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    require('child_process').exec(`start http://${host}:${port}`);
    startLiveReload(requestListener);
});
