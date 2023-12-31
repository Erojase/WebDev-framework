const fs = require("fs");

class ConfigLoader{


    constructor(){
        this.config = JSON.parse(fs.readFileSync("./config.json"));
        this.startAttachedScripts();
        this.componentMapper();
    }

    componentMapper(){
        let compDir = fs.readdirSync("./src/components")
        this.config["components"] = [];
        compDir.forEach(comp => {
            if (comp.includes(".html")) {
                this.config["components"].push(comp.split(".html")[0]);
            }
        });
        this.overWritteConfig(JSON.stringify(this.config));
    }

    overWritteConfig(config){
        fs.writeFileSync("./config.json", config);
    }

    startAttachedScripts(){
        //TODO: execute function with its name
        this.config["scripts"].forEach(script => {
            let [path, func] = script.split("::");
            path = "../"+path;
            require(path).start();
        });
    }

}

module.exports.ConfigLoader = ConfigLoader;