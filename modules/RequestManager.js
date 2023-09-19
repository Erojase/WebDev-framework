const fs = require("fs");
const { renderHTML } = require("./htmlRender");

class RequestManager{

    constructor(config, router, req, res){
        this.config = config;
        this.router = router;
        this.req = req;
        this.res = res;

        this.lastPage = "";
    }

    manage() {
    
        switch (this.req.method) {
            case "GET":
                this.GETmanager();
                break;
            case "POST":
                this.POSTmanager();
                break;
            default:
                break;
        }
    
        
    }

    GETmanager() {
        let page = this.router.route(this.req.url);

    
        if (page.type == "resource") {
            this.res.writeHead(page.status);
            this.res.end(fs.readFileSync(page.path, "utf-8"));
        } else if (page.type == "page") {
            this.lastPage = 
            this.res.writeHead(page.status);
            this.res.end(renderHTML(page.path, this.config));
        } else {
            this.res.writeHead(page.status);
            this.res.end();
        }
    }

    
    POSTmanager() {
        console.log("POST recieved");
    }
}


module.exports.RequestManager = RequestManager;