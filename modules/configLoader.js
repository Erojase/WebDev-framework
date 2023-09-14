const fs = require("fs");

class ConfigLoader{


    constructor(){
        this.config = JSON.parse(fs.readFileSync("./config.json"));
    }

}

module.exports.ConfigLoader = ConfigLoader;