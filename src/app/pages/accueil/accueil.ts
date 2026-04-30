import { ChangeDetectorRef, Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ServicesConnexion } from '../../services/services-connexion';

@Component({
  selector: 'app-accueil',
  //imports: [NgStyle, RouterLink],
  templateUrl: './accueil.html',
  styleUrl: './accueil.scss',
})
export class Accueil {
  public link: SafeResourceUrl = '';

  constructor(
    private sanitizer: DomSanitizer,
    private servicesConnexion: ServicesConnexion,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const user = this.servicesConnexion.getUser();
    if (user && user.adresse) {
      const adresseFormatee = user.adresse.replaceAll(' ', '+');
      this.link = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://maps.google.com/maps?q=' + adresseFormatee + '&t=k&output=embed',
      );
      this.cd.detectChanges();
    }
  }
}
