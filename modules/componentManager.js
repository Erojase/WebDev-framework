function fetchComponents() {
	let config = loadFile("./config.json");
	config = JSON.parse(config);
	config["components"].forEach((comp) => {
		htmlAdder(comp);
	});
}

function htmlAdder(componentName) {
	document.getElementById(componentName).innerHTML = loadFile(
		"./components/" + componentName + ".html"
	);
}

function loadFile(filePath) {
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", filePath, false);
	xmlhttp.send();
	if (xmlhttp.status == 200) {
		result = xmlhttp.responseText;
	}
	return result;
}
