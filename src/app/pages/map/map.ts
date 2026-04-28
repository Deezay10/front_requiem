import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  //imports: [NgStyle, RouterLink],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map {

  public adresse = "6 rue du moulin de la halveque Nante";
  public adresseFormatee: string = "";
  public link: SafeResourceUrl = "";


  constructor(private sanitizer: DomSanitizer) {
    this.adresseFormatee = this.adresse.replaceAll(" ", "+");

    this.adresse = this.adresseFormatee;

  this.link = this.sanitizer.bypassSecurityTrustResourceUrl("https://maps.google.com/maps?q=" + this.adresse + "&t=k&output=embed");

  }
}
