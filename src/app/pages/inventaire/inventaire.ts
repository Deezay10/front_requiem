import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { routes} from '../../app.routes';
import {Legume} from '../../services/services-inventaire';
import { ServicesConnexion } from '../../services/services-connexion';

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.html',
  styleUrl: './inventaire.scss',
})
export class Inventaire implements OnInit {
  public user: any = null;
  public legumes: any[] = [];
  public liste_saison: { [key: string]: string } = {};

  constructor(
    private servicesConnexion: ServicesConnexion,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.user = this.servicesConnexion.getUser();
    this.http.get<any[]>('http://localhost:8080/legumes').subscribe({
      next: (legumes) => {
        this.legumes = legumes;
        for (let legume of this.legumes) {
          if (legume.saisons.length > 1) {
            this.liste_saison[legume.id] = legume.saisons.join(', ');
          } else if (legume.saisons.length === 1) {
            this.liste_saison[legume.id] = legume.saisons[0];
          }
          else {
            this.liste_saison[legume.id] = "Non renseigné";
          }
        }
      },
      error: (err) => {
        console.error('Erreur récupération légumes : ', err);
      },
    });
  }
}

