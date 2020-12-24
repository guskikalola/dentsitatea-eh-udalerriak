const http = require("http");
const fs = require("fs");
var server = http.createServer((req,res)=>{
	if (req.url == "/"){
	fs.readFile("index.html", (err,html)=>{
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(html);
		res.end()
	})
	} else if (req.url == "/wikidata.js") {
		fs.readFile("wikidata.js", (err,js)=>{
		res.writeHead(200, {'Content-Type': 'text/javascript'});
		res.write(js);
		res.end()
	})
	} else if (req.url == "/query.json") {
		fs.readFile("query.json", (err,js)=>{
		res.writeHead(200, {'Content-Type': 'text/json'});
		res.write(js);
		res.end()
	})
	} else res.end()
})
server.listen(8080);
console.log("Webgune prest dago.")