import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { ServicesConnexion } from '../../services/services-connexion';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.scss',
})
export class Connexion {
  email: string = '';
  motdepasse: string = '';
  message: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private servicesConnexion: ServicesConnexion,
  ) {}

  login() {
    const data = { email: this.email, motdepasse: this.motdepasse };

    // On ajoute /users/login pour correspondre au @PostMapping de Java
    this.http.post(`${environment.apiUrl}/users/login`, data).subscribe({
      next: (response: any) => {
        console.log('Connexion réussie ! Token :', response.token);
        this.servicesConnexion.setUser(response.user);
        this.servicesConnexion.setToken(response.token);
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.error('Erreur 401 ou autre :', err);
        this.message = 'Email ou mot de passe incorrect';
      },
    });
  }
}
