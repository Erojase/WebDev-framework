const fs = require("fs");

function startLiveReload(callback) {
    getFilesToListen();
}

function getFilesToListen() {
    console.log(fs.readdirSync("./src"));
}

module.exports.startLiveReload = startLiveReload;