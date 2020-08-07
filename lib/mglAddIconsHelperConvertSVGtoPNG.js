const fs = require("fs");
const svgexport = require("svgexport");

const directory = "./"
const icons = fs.readdirSync(directory);

const iconsObject = []
const svgObject = [];

icons.forEach(icon => {
  const png = icon.replace("svg", "png")
  iconsObject.push({
    name: icon.replace(".svg", ""),
    url: "../" + png
  });

  svgObject.push({
    input: directory + icon,
    output: "./" + png
  })
})

svgexport.render(svgObject, function(e) {
  console.log(e);
  fs.writeFileSync("./icons.json", JSON.stringify(iconsObject,0,2))
})
