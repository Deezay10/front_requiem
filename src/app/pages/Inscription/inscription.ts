import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule],
  templateUrl: './inscription.html',
  styleUrls: ['./inscription.scss'],
})
export class Inscription {

  user = {
    email: "",
    motdepasse: "",
    confirmationmotdepasse: "",
    nom: "",
    prenom: "",
    adresse: "",
    mobile: ""
  };

  public mdpdifferent = false;
  public message = "";

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (this.user.motdepasse !== this.user.confirmationmotdepasse) {
      this.message = "Les mots de passe ne correspondent pas";
      this.mdpdifferent = true;
      return;
    }

    const data = {
      email: this.user.email,
      motdepasse: this.user.motdepasse,
      nom: this.user.nom,
      prenom: this.user.prenom,
      adresse: this.user.adresse,
      mobile: this.user.mobile
    };

    this.http.post('http://localhost:8080/users/register', data).subscribe({
      next: (response) => {
        this.message = "Inscription réussie !";
        this.router.navigate(['/connexion']);
      },
      error: (err) => {
        this.message = "Erreur lors de l'inscription";
      }
    });
  }
}
