import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifier-plante',
  imports: [FormsModule, CommonModule],
  templateUrl: './modifier_plante.html',
  styleUrls: ['./modifier_plante.scss'],
})
export class ModifierPlante implements OnInit {

  public plantation_id: string = "";
  public message: string = "";

  editData = {
    surface_m2: 0,
    etat: "",
    date_plantation: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  public nom_legume: string = "";

  ngOnInit() {
    this.plantation_id = this.route.snapshot.paramMap.get('plantation_id') || "";
    this.http.get<any>(`http://localhost:8080/plantation/${this.plantation_id}`).subscribe({
      next: (data) => {
        this.nom_legume = data.nom;
        this.editData.surface_m2 = data.surface_m2;
        this.editData.etat = data.etat;
        this.editData.date_plantation = data.date_plantation ? data.date_plantation.split('T')[0] : '';
        this.cd.detectChanges();
        console.log(this.nom_legume);
        console.log("Données reçues : ", data);
      },
      error: (err) => {
        console.error("Erreur : ", err);
      }
    });
  }

  save() {
    this.http.post(`http://localhost:8080/edit_plantation/${this.plantation_id}`, this.editData).subscribe({
      next: () => {
        this.router.navigate(['/inventaire']);
      },
      error: (err) => {
        this.message = "Erreur lors de la modification";
        console.error(err);
      }
    });
  }
}
