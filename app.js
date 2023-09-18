const http = require("http");
const fs = require("fs");
const { startLiveReload } = require("./modules/liveReload");
const { ConfigLoader } = require("./modules/configLoader");
const { renderHTML } = require("./modules/htmlRender");
const { Router } = require("./modules/router");

const config = new ConfigLoader().config;
const host = config.host;
const port = config.port;
const indexPath = `./src/${config.index}`;
const router = new Router(indexPath);

let currentPage = "";

const requestListener = function (req, res) {
	let page = router.route(req.url);

	if (page.type == "resource") {
        res.writeHead(page.status);
        res.end(fs.readFileSync(page.path, "utf-8"));
	} else if (page.type == "page") {
        res.writeHead(page.status);
		res.end(renderHTML(page.path, config));
    } else {
        res.writeHead(page.status);
        res.end();
	}
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
	console.log(`Server is running on http://${host}:${port}`);
	require("child_process").exec(`start http://${host}:${port}`);
	startLiveReload(requestListener);
});
