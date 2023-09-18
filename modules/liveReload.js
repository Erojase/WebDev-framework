const fs = require("fs");

//Mirate esto https://stackoverflow.com/questions/65680018/javascript-node-js-check-if-file-has-changed

function startLiveReload(callback) {
    getFilesToListen();
    fs.watch("./src/index.html", (eventType, filename) => {
        console.log("\nThe file", filename, "was modified!");
        console.log("The type of change was:", eventType);
      });
}

function getFilesToListen() {
    //console.log(fs.readdirSync("./src"));
}

module.exports.startLiveReload = startLiveReload;