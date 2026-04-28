import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface Legume {
  id: string,
  nom: string,
  type: string,
  saison: Array<string>,
  temps_croissance_jours: bigint,
  besoin_eau: string,
  ensoleillement: string,
  rendement_moyen_kg_m2: bigint,
  imgPath : string
}
