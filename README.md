# Euskal Herriko udalerrien dentsitatea

Honako proiektuaren helburua, EH udalerri bat emanda dentsitatearen ( biztanleria / azalera ) 
<br>arabera ordenatuta dagoen listako ( handienetik txikienera ) hurrengo udalerrien izena idaztea.

## Fitxategien informazioa
Proiektu honetan hurrengo fitxategiak aurkituko dituzu:<br> 
	- wikidata.js ( Webgunearen funtzionamendua eta udalerrien dentsitate lista kudeatzeko )<br> 
	- index.html ( Webgunearen edukiera )<br> 
	- query.json ( Wikidatatik lortutako udalerrien taula )<br> 
	- webgunea.js ( Webgunearen serbidorea )<br> 
	- dist.js ( wikidata.js + webgunea.js baturatutak, exekutagarri bakarra lortzeko )<br> 
		
## Nola erabili
Programa hau erabiltzeko bi aukera dituzu:<br> 
1. Node/JS instalatuta izanda, webguneaExekutatu.sh bitartez.<br> 
2. dist karpetan dauden exekutagarrien bitartez ( Zure sistemaren arabera )<br> 
	2.1 Windows-en bazaude dist/dist-win.exe ireki<br> 
	2.2 Linux-en bazaude dist/dist-linux ireki<br> 
	2.3 MacOS bazaude dist/dist-macos ireki<br> 

(!) Adi! dist exekutagarriak erabiltzeko, karpeta berean izan behar dituzu bai exekutagarria bai query.json