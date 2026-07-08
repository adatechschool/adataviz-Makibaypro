import {formaterData, cardSwitch} from "./utils.js"

const btnLeft = document.querySelector(".buttonLeft");
const btnRight = document.querySelector(".buttonRight");
const resultsAmount = document.querySelector(".resultAmount");

let centerValue = 0;
let dataTotal = 0;
btnLeft.disabled = true;


formaterData("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/stationnement-sur-voie-publique-emprises/records?limit=100")
  .then(total => {
    dataTotal = total;
    cardSwitch(centerValue, dataTotal)
    resultsAmount.textContent = `Résultats trouvés : ${dataTotal}`;
  })

/*
// === Gestion des ID de cartes pour affichages ---
if (appelId < 0) {
  appelId *= -1;
  centerId = 100 - (appelId % 100);
} else if (appelId % 100 === 0) {   // <- pas appelId === 0
  centerId = 100;
} else {
  centerId = appelId % 100;
}
*/


btnLeft.addEventListener("click", () => {
  if(centerValue > 0){
    centerValue -= 1;
    console.log(centerValue);
    cardSwitch(centerValue);
    btnRight.disabled = false;
  } else {
    btnLeft.disabled = true;
  }
})

btnRight.addEventListener("click", () => {
  if(centerValue < dataTotal){
    centerValue += 1;
    console.log(centerValue);
    cardSwitch(centerValue)
    if(centerValue > 0){
    btnLeft.disabled = false;
    }
  } else if (centerValue === dataTotal - 1){
    btnRight.disabled = true;
  }
})