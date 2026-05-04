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
    private servicesConnexion: ServicesConnexion
  ) {}

  login() {
    const data = { email: this.email, motdepasse: this.motdepasse };

    this.http.post(`${environment.apiUrl}`, data).subscribe({
      next: (response: any) => {
        this.servicesConnexion.setUser(response.user);
        this.servicesConnexion.setToken(response.token);
        this.router.navigateByUrl('/inventaire');
      },
      error: (err) => {
        this.message = 'Email ou mot de passe incorrect';
      },
    });
  }
}
