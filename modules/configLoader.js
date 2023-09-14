const fs = require("fs");

class ConfigLoader{


    constructor(){
        this.config = JSON.parse(fs.readFileSync("./config.json"));
        this.components = this.config["components"];
        this.port = this.config["port"];
    }
}

module.exports.ConfigLoader = ConfigLoader;