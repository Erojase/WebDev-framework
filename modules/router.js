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

	/**
	 * 
	 * @param {*} path 
	 * @returns {Response} page
	 */
	route(path) {
		let pageFound = new Response(400, this.routes[0].path, "None");
		let filter = /\.[A-Za-z]+/i; //Regex to match any string like /***.***

		if (filter.test(path)) {
			if (fs.existsSync("./src"+path)) {
				pageFound.set(200, "./src"+path, "resource");
			} else {
				pageFound.notFound();
			}
		} else {
			this.routes.forEach((route) => {
				if (path == route.route) {
					pageFound.set(200, route.path, "page");
				}
			});
		}
		return pageFound;
	}
}

/** Class for storing a route */
class Route {
	/**
	 *
	 * @param {string} path the path of the html file in the server from the project root
	 * @param {string} route the web route with the / character e.g. "/profile"
	 * @param {"static"|"dynamic"} type type of the route, it can be a static route that goes to a existing html page or dynamic referring to a non-static html file.
	 */
	constructor(path, route, type = "static") {
		this.path = path;
		this.route = route;
		this.type = type;
	}
}

class Response{

	/**
	 * 
	 * @param {Number} status 
	 * @param {string} path 
	 * @param {"None"|"resource"|"page"} type 
	 */
	constructor(status, path, type){
		this.status = status;
		this.path = path;
		this.type = type;
	}

	/**
	 * 
	 * @param {Number} status 
	 * @param {string} path 
	 * @param {"None"|"resource"|"page"} type 
	 */
	set(status, path, type){
		this.status = status;
		this.path = path;
		this.type = type;
	}

	badRequest(){
		this.set(400, "/", "None")
	}

	notFound(){
		this.set(404, "/", "None")
	}
}

module.exports.Router = Router;
module.exports.Response = Response;
