import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ServicesConnexion } from '../../services/services-connexion';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.scss',
})
export class Accueil implements OnInit {
  public link: SafeResourceUrl = '';
  public legumes: any[] = [];
  public liste_saison: { [key: string]: string } = {};
  protected user: any;

  // État de l'IA et du Chat
  public selectedLegume: any = null;
  public iaLoading = false;
  public iaError = '';
  public chatMessages: any[] = [];
  public userQuestion: string = '';

  // Capteurs simulés pour forcer une réaction de l'IA
  private capteurs = {
    humidity: 82,
    air_humidity: 55,
    temperature: 24,
    light_level: 800,
  };

  constructor(
    private sanitizer: DomSanitizer,
    private servicesConnexion: ServicesConnexion,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.user = this.servicesConnexion.getUser();

    if (this.user?.adresse) {
      const adresseFormatee = this.user.adresse.replaceAll(' ', '+');
      this.link = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://maps.google.com/maps?q=' + adresseFormatee + '&t=k&output=embed',
      );
    }

    if (this.user?.id) {
      this.http.get<any[]>(`${environment.apiUrl}/inventaire/users/${this.user.id}`).subscribe({
        next: (legumes) => {
          this.legumes = legumes;
          this.configurerSaisons();

          if (this.legumes.length > 0) {
            this.selectedLegume = this.legumes[0];
            this.analyserPlante();
          }
          this.cd.detectChanges();
        },
        error: (err) => console.error('Erreur inventaire:', err),
      });
    }
  }

  private configurerSaisons() {
    for (let legume of this.legumes) {
      this.liste_saison[legume.id] = legume.saisons?.length > 0 ? legume.saisons.join(', ') : 'Non renseigné';
    }
  }

  selectionnerPlante(legume: any) {
    if (this.selectedLegume?.id === legume.id) return;
    this.selectedLegume = legume;
    this.chatMessages = [];
    this.analyserPlante();
  }

  analyserPlante() {
    if (!this.selectedLegume) return;
    this.iaLoading = true;
    this.iaError = '';

    const body = { nom: this.selectedLegume.nom, capteurs: this.capteurs };

    this.http.post<any>(`${environment.apiUrl}/api/ia/chat/init`, body).subscribe({
      next: (res) => {
        this.chatMessages.push({ role: 'ia', texte: res.message });
        this.iaLoading = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.iaError = 'Service IA indisponible.';
        this.iaLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  poserQuestion() {
    if (!this.userQuestion.trim() || this.iaLoading) return;

    const text = this.userQuestion;
    this.chatMessages.push({ role: 'user', texte: text });
    this.userQuestion = '';
    this.iaLoading = true;

    this.http.post<any>(`${environment.apiUrl}/api/ia/chat/question`, {
      question: text,
      legume: this.selectedLegume.nom
    }).subscribe({
      next: (res) => {
        this.chatMessages.push({ role: 'ia', texte: res.reponse });
        this.iaLoading = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.chatMessages.push({ role: 'ia', texte: "Désolé, une erreur est survenue." });
        this.iaLoading = false;
        this.cd.detectChanges();
      }
    });
  }
}
