const fs = require("fs");

//Mirate esto https://stackoverflow.com/questions/65680018/javascript-node-js-check-if-file-has-changed

function startLiveReload(callback) {
    getFilesToListen();
}

function getFilesToListen() {
    //console.log(fs.readdirSync("./src"));
}

module.exports.startLiveReload = startLiveReload;