import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ServicesConnexion } from '../../services/services-connexion';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.scss',
})

export class Accueil implements OnInit {
  public link: SafeResourceUrl = '';
  public legumes: any[] = [];
  public liste_saison: { [key: string]: string } = {};

  constructor(
    private sanitizer: DomSanitizer,
    private servicesConnexion: ServicesConnexion,
    private http: HttpClient,
    private ngZone: NgZone,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const user = this.servicesConnexion.getUser();

    if (user?.adresse) {
      const adresseFormatee = user.adresse.replaceAll(' ', '+');
      this.link = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://maps.google.com/maps?q=' + adresseFormatee + '&t=k&output=embed',
      );
    }

    if (user?.id) {
      this.http.get<any[]>(`http://localhost:8080/inventaire/users/${user.id}`).subscribe({
        next: (legumes) => {
          this.legumes = legumes;

          for (let legume of this.legumes) {
            if (legume.saisons?.length > 1) {
              this.liste_saison[legume.id] = legume.saisons.join(', ');
            } else if (legume.saisons?.length === 1) {
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
