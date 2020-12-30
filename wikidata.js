// Honako array-an gordeko dira udalerrien izenak, geroago "sugerentziak" emateko
const udalerriak = [];

/**
 * Funtzio honen bitartez udalerri bakoitzaren dentsitatea 
 * kalkulatzen da eta gero lista ordenatua ematen du
 * @param {object} lista - Ordenatu eta dentsitatea kalkulatu nahi den datuen objetua 
 * @returns {object} Sarrerako lista ordenatua handienetik txikienera eta dentsitateak kalkulatuak
 */

function dentsitateaEtaOrdenatu(lista) {
  var aldatua = lista;
  Object.keys(lista).forEach(key => {
    // Datuen elementu bakoitzeko tratatu dentsitatea
    aldatua[key].dentsitatea = aldatua[key].biztanleria / aldatua[key].azalera;
    // Udalerriaren izena gorde geroago sugerentzien prozesua simplifikatzeko
    udalerriak.push(aldatua[key].udalerriaLabel);
  });

  // Azkenik bueltatu aldatutako ( dentsitatea dun ) datuak baino ordenatutak handienetik txikienera
  return aldatua.sort((a, b) => {
    // a : Lehengo elementua konparatzeko
    // b : Bigarren elementua konparatzeko
    return b.dentsitatea - a.dentsitatea; // JS-k integratuta daukan sort funtzioari esker prozesua errazten da
  })
}

/**
 * Sugestioak egiteko balio duen funtzioa
 * @param {string} query 
 * @returns {Array} Baldintza (Hasierako karaktere berdinak) betetzen duten elementuen array-a
 */
function aproximatu(query) {
  let emaitzak = [];
  if (query) {
    udalerriak.forEach(item => {
      // Baldin udalerri batek guk jarritako karakterekin hasten bada, emaitza array-an gorde
      if (item.substr(0, query.length).toUpperCase() == query.toUpperCase()) {
        emaitzak.push(item);
      }
    });
  }
  return emaitzak;
}

// Webgunearen elementuak kargatzean... ( Hau egin behar da, bestela elementuak undefined bezala agertuko lirateke )
window.onload = function () {

  // Sarrera : Input elementua nun idazten da bilatu nahi dena
  // Agerpenak : Sugestioak ematen dituen testua
  const sarrera = document.getElementById("query");
  const agerpenak = document.getElementById("agerpenak");


  var listaOrdenatua;

  // Kargatzen degu query.json fitxategia nun datu guztiak daude
  fetch("./query.json")
    // Kargatzean json moduan irakurtzea esan
    .then(plainDatuak => plainDatuak.json())
    // Behin kargatu duela json bezala tratatu
    .then(async datuak => {

      // Listaren elementuen dentsitatea kalkulatu eta lista ordenatu 
      listaOrdenatua = dentsitateaEtaOrdenatu(datuak);

      // Sarrera elementuaren balioa aldatzen den bakoitzeko "sugerentziak" bilatu
      sarrera.oninput = (e) => {
        let aurkitutakoak = aproximatu(e.target.value);
        if (aurkitutakoak.length <= 4) {
          // Soilik baldin 4 sugerentzia edo gutxiago badaude lehengoaren datuak aztertu
          agerpenak.innerText = "";
          bilatu(aurkitutakoak[0]);
        }
        else {
          // Baldin sugerentzia asko egon, orduan idatzi sugerentziak
          let child = emaitzak.lastElementChild;
          while (child) {
            // Emaitzen elementuaren azpi-elementuak ezabatu ( Aurretik zerbait aurkitu badu, orain ez dugu nahi )
            emaitzak.removeChild(child);
            child = emaitzak.lastElementChild;
          }

          agerpenak.innerText = "";
          aurkitutakoak.forEach(item => {
            // Sugerentzia bakoitzeko lerro berri bat idatzi
            agerpenak.innerText += "\n>" + item;
          })
        }
      }
    }).catch(console.error);

  // Emaitzen elemntua ( Hemen idazten dira dentsitate gertuena duten udalerriak )  
  const emaitzak = document.getElementById("emaitzak");
  /**
   * Bilatu funtzioa arduratzen da datuen artean guk bilatu degun udalerria aurkitzea eta hurrengo X elementuak idazteaz
   * @param {string} query - Bilatu nahi den udalerriaren izena 
   */
  function bilatu(query) {
    var child = emaitzak.lastElementChild;
    while (child) {
      // Garbitu emaitzen elementua..
      emaitzak.removeChild(child);
      child = emaitzak.lastElementChild;
    }
    var kantitatea = 0;
    var aurkituta = false;
    if (query) {
      // Baldin zerbait bilatu degu ( Hau da, bilaketa hutsa ez bada )
      listaOrdenatua.forEach(item => {
        if (item.udalerriaLabel == query) aurkituta = true;
        if (aurkituta && kantitatea < 10) {
          let emaitza = document.createElement("p");
          emaitza.innerText = `${kantitatea + 1}.${item.udalerriaLabel} [Dentsitatea: ${item.dentsitatea}]`;
          emaitzak.appendChild(emaitza);
          kantitatea++;
        }
      });
    }
    else {
      // Ez bada aurkit ( Hutsa delako edo ez delako existitzen ) saiatu sugerentziak ematen
      let hutsik = document.createElement("p");
      hutsik.innerText = "Ezin izan da ezer aurkitu.";
      if (sarrera.value.length > 3) {
        // Sarrera elementuan zerbait idatzita badegu ( 3 karaktere baino gehiago ) aztertu sugerentziak
        let luzera = sarrera.value.length;
        let amaituta = false;
        while (!amaituta && luzera > 2) {
          // Loop honetan egingo duguna da azkeneko karakterea kendu gure bilaketari sugerentziak aurkitu arte ( Edo karaktere gutxikin geratu arte non badakigu ez dela)
          // sugerentzia baliagarria izango sugerentzia asko emango dituelako oso karaketere gutxikin baldintza udalerri askoentzat betetzen delako
          luzera--;
          let posibleak = aproximatu(sarrera.value.substr(0, luzera)).join("\nedo "); // Sugerentziak bilatu eta "edo" hitzarekin lotu string bat bihurtzeko
          if (posibleak.length > 1) { // Sugerentziak aurkitu baditugu idatzi
            amaituta = true;
            hutsik.innerText += " Agian esan nahi zenuen:\n" + posibleak;
          }
        }
      }
      emaitzak.appendChild(hutsik);
    }
  }
}
