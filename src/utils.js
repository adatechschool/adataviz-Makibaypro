


// Liens site : https://opendata.paris.fr/explore/dataset/stationnement-sur-voie-publique-emprises/information/?disjunctive.regpri&disjunctive.regpar&disjunctive.typsta&disjunctive.arrond&disjunctive.locsta&disjunctive.zoneres&disjunctive.parite&disjunctive.signhor&disjunctive.signvert&disjunctive.confsign&disjunctive.typemob&sort=-regpri&basemap=jawg.dark&location=19,48.88298,2.38301
// API : https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/stationnement-sur-voie-publique-emprises/records?limit=100

const cardsGRP = document.querySelector(".cardsGRP");



// --- FONCTIONS ---

const addID = (dataArray) => {
  const dataID = [];
  for(let i = 0; i < dataArray.length;i++){
    dataID.push({...dataArray[i], id: i});
  }
  return dataID;
}

const insertCard = (parkingSlot) => {
  let img = "";
  if(parkingSlot.regpri === "LIVRAISON") img = "./src/assets/truck.png";
  else if(parkingSlot.regpri === "2 ROUES") img = "./src/assets/motorcycle.png";
  else if(parkingSlot.regpri === "GIG/GIC") img = "./src/assets/wheelChair.png"
  else if(parkingSlot.regpri === "PAYANT MIXTE" || parkingSlot.regpri === "PAYANT ROTATIF") img = "./src/assets/car.png";
  else if(parkingSlot.regpri === "AUTRE REGIME") img = "./src/assets/car.png";

  let card = `<article class="card" data-id="${parkingSlot.id}">
        <h2>${parkingSlot.typevoie} ${parkingSlot.nomvoie}</h2>
        <img src="${img}" alt="PictoPlace" class="imgSize"/>
        <dl class="infos" >
          <dt class="infosType" >Type de place :</dt>
          <dd class="infosData">${parkingSlot.regpri}</dd>

          <dt class="infosType" >Disposition :</dt>
          <dd class="infosData">${parkingSlot.typsta}</dd>

          <dt class="infosType" >Longueur :</dt>
          <dd class="infosData">${parkingSlot.lon.toFixed(2)} mètre</dd>

          <dt class="infosType" >Largeur :</dt>
          <dd class="infosData">${parkingSlot.lar} mètre</dd>

          <dt class="infosType" >Nb. de place (Approx):</dt>
          <dd class="infosData">${parkingSlot.plarel}</dd>
        </dl>
  </article>`
  cardsGRP.insertAdjacentHTML("beforeend", card);
};

export const dataTotal = async (link) => {
  try {
    const response = await fetch(link);
    const data = await response.json();
    const dataArray = data.results;
    const dataTotal = dataArray.length;
  } catch (error){
    console.error(error.message);
  }
  return console.log(dataTotal);
}

//--- Fonction Selection Card ---
export const cardSwitch = (centerValue) => {
  const stepX = 33;
  const offset = -(centerValue - 1) * stepX;
  document.querySelector(".cardsGRP").style.transform = `translateX(${offset}vw)`;
}

// --- Recuperation des donnés ---
export const formaterData = async (link) => {
  try {
    const response = await fetch(link);
    const data = await response.json();
    console.log("data :" + data);

    const dataArray = data.results;
    console.log("dataArray :" + dataArray);

    const dataTotal = dataArray.length;

    const dataFinal = addID(dataArray);
    console.log("dataID :" + dataFinal[2].id);

    dataFinal.forEach(parkingSlot => {
      insertCard(parkingSlot);
    });

    return dataTotal
  } catch (error){
    console.error(error.message);
  }
}
