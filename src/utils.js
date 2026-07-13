


// Liens site : https://opendata.paris.fr/explore/dataset/stationnement-sur-voie-publique-emprises/information/?disjunctive.regpri&disjunctive.regpar&disjunctive.typsta&disjunctive.arrond&disjunctive.locsta&disjunctive.zoneres&disjunctive.parite&disjunctive.signhor&disjunctive.signvert&disjunctive.confsign&disjunctive.typemob&sort=-regpri&basemap=jawg.dark&location=19,48.88298,2.38301
// API : https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/stationnement-sur-voie-publique-emprises/records?limit=100


// --- FONCTIONS ---
// -----------------

// --- Ajout d'ID dans les donnees ---
const addID = (dataArray) => {
  const dataID = [];
  for(let i = 0; i < dataArray.length;i++){
    dataID.push({...dataArray[i], id: i});
  }
  return dataID;
}

// --- Creation des cartes ---
const insertCard = (parkingSlot, cardsGRP) => {
  let img = "";
  if(parkingSlot.regpri === "LIVRAISON") img = "./src/assets/truck.png";
  else if(parkingSlot.regpri === "2 ROUES") img = "./src/assets/motorcycle.png";
  else if(parkingSlot.regpri === "GIG/GIC") img = "./src/assets/wheelChair.png"
  else if(parkingSlot.regpri === "PAYANT MIXTE" || parkingSlot.regpri === "PAYANT ROTATIF") img = "./src/assets/car.png";
  else if(parkingSlot.regpri === "AUTRE REGIME") img = "./src/assets/car.png";
  else if(parkingSlot.regpri === "LOCATION") img = "./src/assets/truck.png";
  else if(parkingSlot.regpri === "ELECTRIQUE") img = "./src/assets/car.png";
  else if(parkingSlot.regpri === "GRATUIT") img = "./src/assets/car.png";

  // --- On viens creer nos carte avec nos infos en ay appliquand l'id creer via les donnees --- 
  let card = `<article class="card" data-id="${parkingSlot.id}">
        <h2>${parkingSlot.typevoie} ${parkingSlot.nomvoie}</h2>
        <img src="${img}" alt="PictoPlace" class="imgSize"/>
        <dl class="infos" >
          <dt class="infosType" >Type de place :</dt>
          <dd class="infosData">${parkingSlot.regpri}</dd>

          <dt class="infosType" >Disposition :</dt>
          <dd class="infosData">${parkingSlot.typsta}</dd>

          <dt class="infosType" >Longueur :</dt>
          <dd class="infosData">${parkingSlot.lon.toFixed(2)} mètres</dd>

          <dt class="infosType" >Largeur :</dt>
          <dd class="infosData">${parkingSlot.lar} mètres</dd>

          <dt class="infosType" >Nb. de place (Approx):</dt>
          <dd class="infosData">${parkingSlot.plarel}</dd>
        </dl>
  </article>`
  cardsGRP.insertAdjacentHTML("beforeend", card);
};

// --- Filter Fonction ---
export const filtre = (data, research) => {
  const dataOG = [...data.array];
  let dataTotal = 0;

  research = research.toLowerCase();
  
  const dataFiltered = dataOG.filter(element => 
    element.nomvoie.toLowerCase().includes(research) || element.regpri.toLowerCase().includes(research)
  );

  dataTotal = dataFiltered.length;

  return { total: dataTotal, array: dataFiltered};
}

// --- Filter Panel Fonction ---
export const filters = (data, formData) => {
  let dataFiltered = [...data.array];
  let dataTotal = 0;

  let categorie = formData.get("categorie")
  let type = formData.get("type")
  let nbPlace = formData.get("numberFilter");
  let long = formData.get("longueur");
  let larg = formData.get("largeur");

  // --- Verification de presence des informations avant de filtrer le tableau de donnees ---
  if(categorie) {
    dataFiltered = dataFiltered.filter( element => 
      element.regpri === categorie
    )
  }

  if(type) {
    dataFiltered = dataFiltered.filter(element => 
      element.typsta === type
    )
  }

  if(nbPlace) {
    dataFiltered = dataFiltered.filter(element => 
      element.plarel >= nbPlace
    )
  }
  
  if(long) {
    dataFiltered = dataFiltered.filter(element =>
      element.lon >= long
    )
  }

  if(larg) {
    dataFiltered = dataFiltered.filter(element => 
      element.lar >= larg
    )
  }

  dataTotal = dataFiltered.length;

  return { array: dataFiltered, total: dataTotal};
}


// --- Récuperation des données ---
export const formaterData = async (link) => {
  try {
    const response = await fetch(link);
    const data = await response.json();

    const dataArray = data.results;
    const dataTotal = dataArray.length;

    return { total: dataTotal, array: dataArray }
    
  } catch (error){
    console.error(error.message);
  }
}


//--- Afficher les cartes ---
export const displayCard = (data, cardsGRP) => {
    // --- On applique un ID sur chaque objet de donnee ---
    data.array = addID(data.array);

    data.array.forEach(parkingSlot => {
      insertCard(parkingSlot, cardsGRP);
    });

}


//--- Fonction Slider ---
export const cardSwitch = (centerValue, rail, centerCard) => { 
  // --- On applique un scale de 1 sur toute les cartes pour que seule la ---
  // --- selectionner sois modifier ---
  document.querySelectorAll('.card').forEach(card => {
    card.style.transform = 'scale(0.9)';
  });
  // --- On met la valeur a 33 pour decaler la premiere carte au milieu ---
  const stepX = 33;
  // --- On calcul le nombre de fois ou on doit decaler vers la gauche ---
  // --- avec le -() sinon valeur positif et on part a droite ---
  const offset = -(centerValue - 1) * stepX;
  // --- on applique le resultat en style inline sur le groupe des cartes ---
  if (rail) rail.style.transform = `translateX(${offset}vw)`;
  // --- les if verifient que le chargement est bien fait et annule une erreur ---
  // --- ou on pourrait avoir un null au chargement de la page ---
  if (centerCard) centerCard.style.transform = `scale(1.1)`;

}
