const fs = require("fs");

function startLiveReload(port) {
	let files = listAllDirFiles("./src");

	files.forEach((path) => {
		fs.watchFile(path, (curr, prev) => {
			console.log("Change detected, reloading...");
            try {
                fetch(`http://localhost:${port}/reload`, {
                    method: "POST",
                });
            } catch (error) {
                
            }
		});
	});
}

/**
 * lists an array of every file in the given directory and subdirectories
 * @param {string} dirPath
 */
function listAllDirFiles(dirPath) {
	let files = [];
	let dir = fs.readdirSync(dirPath);

	dir.forEach((elem) => {
		if (fs.statSync(`${dirPath}/${elem}`).isFile()) {
			files.push(`${dirPath}/${elem}`);
		} else {
			files = files.concat(listAllDirFiles(`${dirPath}/${elem}`));
		}
	});

	return files;
}

module.exports.startLiveReload = startLiveReload;
