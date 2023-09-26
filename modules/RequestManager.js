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

    GETmanager(page = null) {
        if (page == null) {
            page = this.router.route(this.req.url);
        }

    
        if (page.type == "resource") {
            this.res.writeHead(page.status);
            this.res.end(fs.readFileSync(page.path, "utf-8"));
        } else if (page.type == "page") {
            this.lastPage = page;
            this.res.writeHead(page.status);
            this.res.end(renderHTML(page.path, this.config));
        } else if (page.type == "function") {
            this.res.writeHead(page.status);
            this.res.end(page.path());
        } else {
            this.res.writeHead(page.status);
            this.res.end();
        }
    }

    
    POSTmanager() {
        console.log("POST recieved");
        this.GETmanager(this.lastPage);
    }
}


module.exports.RequestManager = RequestManager;