const http = require("http");
const { startLiveReload } = require("./modules/liveReload");
const { ConfigLoader } = require("./modules/configLoader");
const { Router } = require("./modules/router");
const { RequestManager } = require("./modules/RequestManager");

const config = new ConfigLoader().config;
const host = config.host;
const port = config.port;
const indexPath = `./src/${config.index}`;
const router = new Router(indexPath);


const requestListener = function (req, res) {
	new RequestManager(config, router, req, res).manage();
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
	console.log(`Server is running on http://${host}:${port}`);
	require("child_process").exec(`start http://${host}:${port}`);
	
	if (host == "localhost") {
		startLiveReload(port);
	}
});
