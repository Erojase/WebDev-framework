

class Router{


    constructor(indexPath){
        this.loadRoutes();
        this.index = indexPath;
    }

    loadRoutes(){

    }

    route(path){
        if (path == "/") {
            return {"status":200, "path":this.index};
        }

        return {"status": 400, "path":this.index};
    }
}


module.exports.Router = Router;