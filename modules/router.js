const fs = require("fs");

class Router {
	/**
	 * @param {string} indexPath the file path to the index file
	 */
	constructor(indexPath) {
		this.routes = [new Route("/",indexPath)];
		this.loadRoutes();
	}

	loadRoutes() {
		let contents = fs.readdirSync("./src/pages");
		contents.forEach((elem) => {
			if (elem.includes(".html")) {
				this.routes.push(
					new Route( "/" + elem.split(".html")[0],"./src/pages/" + elem)
				);
			}
		});
	}

	/**
	 * 
	 * @param {string} path 
	 * @param {()} callback 
	 */
	createEndpoint(path, callback){
		this.routes.push(
			new Route(path, callback, "dynamic")
		)
	}

	/**
	 * 
	 * @param {*} path 
	 * @returns {Response} page
	 */
	route(path) {
		let pageFound = new Response(400, this.routes[0].destination, "None");
		let filter = /\.[A-Za-z]+/i; //Regex to match any string like /***.***

		if (filter.test(path)) { // if is a file
			if (fs.existsSync("./src"+path)) {
				pageFound.set(200, "./src"+path, "resource");
			} else {
				pageFound.notFound();
			}
		} else { //else, is an endpoint
			this.routes.forEach((route) => {
				if (path == route.endpoint) {
					if (route.type == "static") {
						pageFound.set(200, route.destination, "page");
					} else if (route.type == "dynamic") {
						pageFound.set(200, route.destination, "function");
					}
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
	 * @param {string} route the web route with the / character e.g. "/profile"
	 * @param {string | ()} destination the path of the html file in the server from the project root
	 * @param {"static"|"dynamic"} type type of the route, it can be a static route that goes to a existing html page or dynamic referring to a non-static html file.
	 */
	constructor(route, destination, type = "static" ) {
		this.destination = destination; // idk what name give it https://a.pinatafarm.com/1500x1005/2347970ac0/jackie-chan-confused.jpg
		this.endpoint = route;
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
	 * @param {"None"|"resource"|"page"|"function"} type 
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