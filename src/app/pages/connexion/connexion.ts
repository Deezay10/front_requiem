import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, Routes } from '@angular/router';

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
  ) {}

  login() {
    const data = { email: this.email, motdepasse: this.motdepasse };

    this.http.post('http://localhost:8080/users/login', data).subscribe({
      next: (response) => {
        this.message = 'Connexion réussie !';
        this.router.navigate(['/inventaire']);
      },
      error: (err) => {
        this.message = 'Email ou mot de passe incorrect';
      },
    });
  }
}
