/**
*	Exekutagarri bakarra egiteko
*	kode guztia fitxategi batean
*	pilatuta.
*
*/
// HTML
const html = '<head></head><body><script src="wikidata.js" type="text/javascript"></script><table><tr><td><input id="query" placeholder="Udalerriaren izena"></td><tr><td><p id="agerpenak"></p></td></tr></tr><tr><td><div id="emaitzak"></td></tr></table></div>';
// JS
const script = 'const udalerriak=[];function dentsitateaEtaOrdenatu(lista){var aldatua=lista;Object.keys(lista).forEach(key=>{aldatua[key].dentsitatea=aldatua[key].biztanleria/aldatua[key].azalera;udalerriak.push(aldatua[key].udalerriaLabel)});return aldatua.sort((a,b)=>{return b.dentsitatea-a.dentsitatea})}function aproximatu(query){let emaitzak=[];if(query){udalerriak.forEach(item=>{if(item.substr(0,query.length).toUpperCase()==query.toUpperCase()){emaitzak.push(item)}})}return emaitzak}window.onload=function(){const sarrera=document.getElementById("query");const agerpenak=document.getElementById("agerpenak");var listaOrdenatua;fetch("./query.json").then(plainDatuak=>plainDatuak.json()).then(async datuak=>{listaOrdenatua=dentsitateaEtaOrdenatu(datuak);sarrera.oninput=(e)=>{let aurkitutakoak=aproximatu(e.target.value);if(aurkitutakoak.length<=4){agerpenak.innerHTML="";bilatu(aurkitutakoak[0])}else{let child=emaitzak.lastElementChild;while(child){emaitzak.removeChild(child);child=emaitzak.lastElementChild}agerpenak.innerHTML="";aurkitutakoak.forEach(item=>{agerpenak.innerHTML+="<br>>"+item})}}}).catch(console.error);const emaitzak=document.getElementById("emaitzak");function bilatu(query){var child=emaitzak.lastElementChild;while(child){emaitzak.removeChild(child);child=emaitzak.lastElementChild}var kantitatea=0;var aurkituta=false;if(query){listaOrdenatua.forEach(item=>{if(item.udalerriaLabel==query)aurkituta=true;if(aurkituta&&kantitatea<10){let emaitza=document.createElement("p");emaitza.innerHTML=`${kantitatea+1}.${item.udalerriaLabel}[Dentsitatea:${item.dentsitatea}]`;emaitzak.appendChild(emaitza);kantitatea++}})}else{let hutsik=document.createElement("p");hutsik.innerHTML="Ezin izan da ezer aurkitu.";if(sarrera.value.length>3){let luzera=sarrera.value.length;let amaituta=false;while(!amaituta&&luzera>2){luzera--;let posibleak=aproximatu(sarrera.value.substr(0,luzera)).join("<br>edo ");if(posibleak.length>1){amaituta=true;hutsik.innerHTML+=" Agian esan nahi zenuen:<br>"+posibleak}}}emaitzak.appendChild(hutsik)}}}';
// WEB
const http = require("http");
const fs = require("fs");
var server = http.createServer((req,res)=>{
	if (req.url == "/"){
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(html);
		res.end();
	} else if (req.url == "/wikidata.js") {
		res.writeHead(200, {'Content-Type': 'text/javascript'});
		res.write(script);
		res.end();
	} else if (req.url == "/query.json") {
		fs.readFile("query.json", (err,json)=>{
		res.writeHead(200, {'Content-Type': 'text/json'});
		res.write(json);
		res.end();
	})
	} else res.end();
})
server.listen(8080);
console.log("Webgune prest dago.")