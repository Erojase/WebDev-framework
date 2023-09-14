const fs = require("fs");
const { JSDOM } = require("jsdom");

function renderHTML(filePath, config) {
    const dom = new JSDOM(fs.readFileSync(filePath, "utf-8"));
    return getComponents(dom, config);
    
}

function getComponents(dom, config) {
    config["components"].forEach(comp => {
        if (dom.window.document.getElementById(comp) != undefined) {
            let HTMLcomp = fs.readFileSync(`./src/components/${comp}.html`, 'utf-8');
            dom.window.document.getElementById(comp).innerHTML = HTMLcomp;
        }
    });
    
    return dom.serialize();
}


module.exports.renderHTML = renderHTML;