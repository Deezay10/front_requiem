import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicesConnexion } from '../../services/services-connexion';

@Component({
  selector: 'app-ajout-plantes',
  imports: [FormsModule, CommonModule],
  templateUrl: './ajout_plantes.html',
  styleUrls: ['./ajout_plantes.scss'],
})
export class AjoutPlantes {

  plantation = {
    nom: "",
    surface_m2: 0,
  };

  public legumes: any[] = [];
  public message = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private servicesConnexion: ServicesConnexion
  ) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/legumes').subscribe({
      next: (legumes) => {
        this.legumes = legumes;
      },
      error: (err) => {
        console.error('Erreur récupération légumes : ', err);
      }
    });
  }

  add() {
    const user = this.servicesConnexion.getUser();

    if (!user) {
      this.message = "Vous devez être connecté";
      return;
    }

    this.http.post(`http://localhost:8080/add_plantation/users/${user.id}`, this.plantation).subscribe({
      next: (response) => {
        this.router.navigate(['/inventaire']);
      },
      error: (err) => {
        this.message = "Plante non trouvée ou erreur lors de l'ajout";
      }
    });
  }
}
