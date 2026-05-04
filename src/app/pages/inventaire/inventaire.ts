import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { routes} from '../../app.routes';
import {Legume} from '../../services/services-inventaire';
import { ServicesConnexion } from '../../services/services-connexion';
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../environments/environment';

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
    private ngZone: NgZone,
    private cd:ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.user = this.servicesConnexion.getUser();
    console.log("User complet : ", this.user);
    console.log("User id : ", this.user.id);

    if (this.user) {
      this.http.get<any[]>(`${environment.apiUrl}/inventaire/users/${this.user.id}`).subscribe({
        next: (legumes) => {
          console.log('Légumes reçus : ', legumes);
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
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Erreur récupération légumes : ', err);
        },
      });
    }
  }
}

