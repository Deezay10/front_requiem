import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServicesConnexion } from './services/services-connexion';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('front_projet');

  constructor(
    private servicesConnexion: ServicesConnexion,
    private router: Router,
  ) {}

  get isConnecte(): boolean {
    return !!this.servicesConnexion.getUser();
  }

  deconnexion() {
    this.servicesConnexion.logout();
    this.router.navigate(['/connexion']);
  }
}
