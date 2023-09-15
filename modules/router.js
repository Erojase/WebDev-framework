const fs = require("fs");

class Router {
	/**
	 * @param {string} indexPath the file path to the index file
	 */
	constructor(indexPath) {
		this.routes = [new Route(indexPath, "/")];
		this.loadRoutes();
	}

	loadRoutes() {
		let contents = fs.readdirSync("./src/pages");
		contents.forEach((elem) => {
			if (elem.includes(".html")) {
				this.routes.push(
					new Route("./src/pages/" + elem, "/" + elem.split(".html")[0])
				);
			}
		});
	}

	route(path) {
		let pageFound = { status: 400, path: this.routes[0].path };
		this.routes.forEach((route) => {
			if (path == route.route) {
				pageFound = { status: 200, path: route.path };
			}
		});
		return pageFound;
	}
}

/** Class for storing a route */
class Route {
	/**
	 *
	 * @param {string} path the path of the html file in the server from the project root
	 * @param {string} route the web route with the / character e.g. "/profile"
	 * @param {"static"|"other"} type type of the route, it can be a static route that goes to a existing html page or
	 */
	constructor(path, route, type = "static") {
		this.path = path;
		this.route = route;
		this.type = type;
	}
}

module.exports.Router = Router;
