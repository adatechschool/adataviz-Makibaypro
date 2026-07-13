import {formaterData, cardSwitch, displayCard, filtre, filters } from "./utils.js"

const btnLeft = document.querySelector(".buttonLeft");
const btnRight = document.querySelector(".buttonRight");
const btnFilter = document.querySelector(".filterBTN");
const resultsAmount = document.querySelector(".resultAmount");
const searchBar = document.querySelector(".searchBar");
const rail = document.querySelector(".cardsGRP");
const filterPanel = document.querySelector(".filterPanel");
const link = "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/stationnement-sur-voie-publique-emprises/records?limit=100";
const applyBtn = document.querySelector(".applyBTN");


let centerValue = 0;
let dataTotal = 0;
btnLeft.disabled = true;
let centerCard = null;
let dataGlobal = {};
let dataFiltered = [];
let research = "";


const refreshDisplay = (research, formData) => {
  // --- On applique toujours les deux filtres en chaîne ---
  let result = filtre(dataGlobal, research);
  // --- On recup les data du form si elles existent sinon on continu ---
  if (formData) {
    result = filters(result, formData);
  }
  // -- on remet a 0 l'emplacement des cartes apres l'application du filtre ---
  rail.innerHTML = "";
  centerValue = 0;
  // --- on creer et affiche les cartes ---
  displayCard(result, rail);

  // --- on designe la carte centrale et applique l'effet de slider --- 
  centerCard = document.querySelector(`[data-id="${centerValue}"]`);
  cardSwitch(centerValue, rail, centerCard);

  // --- on affiche le nombre de resultat trouve et on actualise les boutons ---
  dataTotal = result.total;
  resultsAmount.textContent = `Résultats trouvés : ${dataTotal}`;
  btnLeft.disabled = (centerValue === 0);
  btnRight.disabled = (centerValue === dataTotal - 1);
}




// --- On appele nos differente fonction pour l'affichage de base --- 
const main = async () => {

  dataGlobal = await formaterData(link);

  resultsAmount.textContent = `Résultats trouvés : ${dataGlobal.total}`;
  dataTotal = dataGlobal.total;

  
  displayCard(dataGlobal, rail);

  const cards = document.querySelectorAll(".card");
  centerCard = document.querySelector(`[data-id="${centerValue}"]`);

  cardSwitch(centerValue, rail, centerCard);
  


}



// --- On appel la fonction principale ---
main();











// --- On affiche les carte liees a la recherche ---
searchBar.addEventListener("input", event => {
  research = event.target.value;
  const formData = new FormData(filterPanel);
  refreshDisplay(research, formData);
});

// --- On affiche les carte liees aux filtres actif  ---
applyBtn.addEventListener("click" , event => {
  event.preventDefault();
  const formData = new FormData(filterPanel);
  refreshDisplay(research, formData);
  filterPanel.classList.toggle("cache");
})

// --- Affiche et desactif l'affichage du panneau de filtres ---
btnFilter.addEventListener("click", () => {
  filterPanel.classList.toggle("cache");
})

// --- Declanche l'animation vers la gauche se desactive si il n'y a aucune carte a gauche ---
btnLeft.addEventListener("click", () => {
  if (centerValue > 0) {
    centerValue -= 1;
    centerCard = document.querySelector(`[data-id="${centerValue}"]`);
    cardSwitch(centerValue, rail, centerCard);
    btnRight.disabled = false;
  }
    btnLeft.disabled = (centerValue === 0);

});

// --- Declanche l'animation vers la droite se desactive si il n'y a aucune carte a droite ---
btnRight.addEventListener("click", () => {
  if (centerValue < dataTotal - 1) {
    centerValue += 1;
    centerCard = document.querySelector(`[data-id="${centerValue}"]`);
    cardSwitch(centerValue, rail, centerCard);
    btnLeft.disabled = false;
  }
    btnRight.disabled = (centerValue === dataTotal - 1);

});