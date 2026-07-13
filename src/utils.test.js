import {formaterData, cardSwitch, displayCard, filtre, filters } from "./utils.js" 
import { describe, it, expect } from "vitest";

export const testData = {
  total: 6,
  array: [
    {
      id: 0,
      nomvoie: "Rue de la Paix",
      regpri: "2 ROUES",
      typsta: "BATAILLE",
      lon: 5.2,
      lar: 1.8,
      plarel: 4
    },
    {
      id: 1,
      nomvoie: "Rue de Rivoli",
      regpri: "LIVRAISON",
      typsta: "EPI",
      lon: 8.0,
      lar: 2.2,
      plarel: 2
    },
    {
      id: 2,
      nomvoie: "Avenue de la Paix",
      regpri: "PAYANT MIXTE",
      typsta: "LONGITUDINALE",
      lon: 5.0,
      lar: 1.9,
      plarel: 10
    },
    {
      id: 3,
      nomvoie: "Boulevard Voltaire",
      regpri: "GIG/GIC",
      typsta: "BATAILLE",
      lon: 3.5,
      lar: 2.0,
      plarel: 1
    },
    {
      id: 4,
      nomvoie: "Rue de Rivoli",
      regpri: "PAYANT ROTATIF",
      typsta: "EPI",
      lon: 6.1,
      lar: 1.8,
      plarel: 5
    },
    {
      id: 5,
      nomvoie: "Rue Saint-Honoré",
      regpri: "ELECTRIQUE",
      typsta: "LONGITUDINALE",
      lon: 4.4,
      lar: 1.8,
      plarel: 3
    }
  ]
};

const fakeFormData = new URLSearchParams({
  categorie: "2 ROUES",
  type: "",
  numberFilter: "",
  longueur: "",
  largeur: ""
});

describe("Filtre le contenu via la recherche", () => {
    it("Retourne seulement avec les elements demandes", () => {
        expect(filtre(testData, "Bou")).toEqual({array: [{
                                                        id: 3,
                                                        nomvoie: "Boulevard Voltaire",
                                                        regpri: "GIG/GIC",
                                                        typsta: "BATAILLE",
                                                        lon: 3.5,
                                                        lar: 2.0,
                                                        plarel: 1
        }], total: 1});
    });
});

describe("Filters ajoute des filtres sur le contenu via la recherche", () => {
    it("Retourne seulement avec les elements demandes", () => {
        expect(filters(testData, fakeFormData)).toEqual({array: [{
                                                                id: 0,
                                                                nomvoie: "Rue de la Paix",
                                                                regpri: "2 ROUES",
                                                                typsta: "BATAILLE",
                                                                lon: 5.2,
                                                                lar: 1.8,
                                                                plarel: 4
        }],total: 1});
    });
});