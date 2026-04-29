import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { routes} from '../../app.routes';
import {Legume} from '../../services/services-inventaire';
import { ServicesConnexion } from '../../services/services-connexion';

declare var UIkit: any;

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.html',
  styleUrl: './inventaire.scss',
  standalone: true,
  imports: [CommonModule]
})
export class Inventaire implements OnInit {
  public user: any = null;
  public legumes: any[] = [];
  public liste_saison: { [key: string]: string } = {};
  public isloading = false;

  constructor(
    private servicesConnexion: ServicesConnexion,
    private http: HttpClient,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.user = this.servicesConnexion.getUser();
    console.log("User complet : ", this.user);
    console.log("User id : ", this.user.id);

    // Test temporaire
    this.legumes = [{ id: "test", nom: "Tomate test", image_url: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300", croissance_jours: 70, rendement: 6, saisons: ["printemps"] }];
    this.liste_saison["test"] = "printemps";

    if (this.user) {
        this.http.get<any[]>(`http://localhost:8080/inventaire/users/${this.user.id}`).subscribe({
          next: (legumes) => {
            this.ngZone.run(() => {
            console.log("Légumes reçus : ", legumes);
            this.legumes = legumes;
            for (let legume of this.legumes) {
              if (legume.saisons && legume.saisons.length > 1) {
                this.liste_saison[legume.id] = legume.saisons.join(', ');
              } else if (legume.saisons && legume.saisons.length === 1) {
                this.liste_saison[legume.id] = legume.saisons[0];
              } else {
                this.liste_saison[legume.id] = 'Non renseigné';
              }
            }
            });
          },
          error: (err) => {
          console.error('Erreur récupération légumes : ', err);
          },
        });
    }
  }
}

