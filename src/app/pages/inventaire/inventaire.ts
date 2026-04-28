import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { routes} from '../../app.routes';
import {Legume} from '../../services/services-inventaire';

@Component({
  selector: 'app-inventaire',
  //imports: [NgStyle, RouterLink],
  templateUrl: './inventaire.html',
  styleUrl: './inventaire.scss',
})
export class Inventaire implements OnInit {

  public legumes = [
    {
      "id": 4,
      "nom": "Courgette Verte",
      "type": "legume",
      "saison": [
        "ete"
      ],
      "temps_croissance_jours": 60,
      "besoin_eau": "eleve",
      "ensoleillement": "fort",
      "rendement_moyen_kg_m2": 8,
      "imgPath": "https://jardinsdevartan.com/wp-content/uploads/2016/03/courgette-verte-jardins-de-vartan.jpg"
    },
    {
      "id": 8,
      "nom": "Poivron Rouge",
      "type": "legume",
      "saison": [
        "printemps",
        "ete"
      ],
      "temps_croissance_jours": 85,
      "besoin_eau": "moyen",
      "ensoleillement": "fort",
      "rendement_moyen_kg_m2": 4,
      "imgPath": "https://www.cnertrading.fr/1259-home_default/No.jpg"
    },
    {
      "id": 6,
      "nom": "Epinard",
      "type": "legume",
      "saison": [
        "automne"
      ],
      "temps_croissance_jours": 40,
      "besoin_eau": "moyen",
      "ensoleillement": "faible",
      "rendement_moyen_kg_m2": 2.5,
      "imgPath": "https://www.cnertrading.fr/1244-home_default/epinard-branche-1x-1kg-fr.jpg"
    }
  ]
  public liste_saison: { [key: string]: string } = {};

  ngOnInit() {
    for (let legume of this.legumes) {
      if (legume.saison.length > 1) {
        this.liste_saison[legume.id] = legume.saison.join(", ");
      } else {
        this.liste_saison[legume.id] = legume.saison[0];
      }
    }
  }
}
