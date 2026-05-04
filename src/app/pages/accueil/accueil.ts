import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ServicesConnexion } from '../../services/services-connexion';
import { environment } from '../../../environments/environment';


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

  public selectedLegume: any = null;
  public iaResult: {
    health_score: number;
    status: string;
    status_label: string;
    advice: string;
  } | null = null;
  public iaLoading = false;
  public iaError = '';

  // Capteurs simulés (remplacer par Home Assistant plus tard)
  private capteurs = {
    humidity: 30,
    air_humidity: 55,
    temperature: 28,
    light_level: 800,
  };

  protected user: any;

  constructor(
    private sanitizer: DomSanitizer,
    private servicesConnexion: ServicesConnexion,
    private http: HttpClient,
    private ngZone: NgZone,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.user = this.servicesConnexion.getUser();
    const user = this.servicesConnexion.getUser();

    if (user?.adresse) {
      const adresseFormatee = user.adresse.replaceAll(' ', '+');
      this.link = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://maps.google.com/maps?q=' + adresseFormatee + '&t=k&output=embed',
      );
    }

    if (user?.id) {
      this.http.get<any[]>(`${environment.apiUrl}/inventaire/users/${user.id}`).subscribe({
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

          if (this.legumes.length > 0) {
            this.selectedLegume = this.legumes[0];
            this.analyserPlante();
          }

          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Erreur récupération légumes : ', err);
        },
      });
    }
  }

  selectionnerPlante(legume: any) {
    this.selectedLegume = legume;
    this.iaResult = null;
    this.analyserPlante();
  }

  analyserPlante() {
    if (!this.selectedLegume) return;

    this.iaLoading = true;
    this.iaError = '';
    this.iaResult = null;

    const body = {
      plant: {
        nom: this.selectedLegume.nom,
        type: this.selectedLegume.type,
        besoin_eau: this.selectedLegume.besoin_eau,
        ensoleillement: this.selectedLegume.ensoleillement,
        saison: this.selectedLegume.saisons,
        croissance_jours: this.selectedLegume.croissance_jours,
      },
      plants_user: {
        date_plantation: this.selectedLegume.date_plantation,
        surface_m2: this.selectedLegume.surface_m2,
        etat: this.selectedLegume.etat,
      },
      capteurs: this.capteurs,
    };

    this.http.post<any>(`$${environment.iaUrl}/api/analyze/`, body).subscribe({
      next: (result) => {
        this.iaResult = result;
        this.iaLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Erreur analyse IA : ', err);
        this.iaError = 'Impossible de contacter le service IA.';
        this.iaLoading = false;
        this.cd.detectChanges();
      },
    });
  }

  getScoreColor(): string {
    if (!this.iaResult) return '#ccc';
    if (this.iaResult.health_score >= 70) return '#4caf50';
    if (this.iaResult.health_score >= 40) return '#ff9800';
    return '#f44336';
  }

  getStatusIcon(): string {
    if (!this.iaResult) return 'info';
    const icons: { [key: string]: string } = {
      healthy: 'check',
      drought_stress: 'warning',
      overwatered: 'warning',
      light_deficiency: 'warning',
      heat_stress: 'warning',
      nutrient_deficiency: 'warning',
      disease_risk: 'bolt',
    };
    return icons[this.iaResult.status] ?? 'info';
  }
}
