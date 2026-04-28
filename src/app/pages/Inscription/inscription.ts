import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

export class User {
  public email: string = '';
  public password: string = '';
  public passwordConfirm: string = '';
  public pseudo: string = '';
  public city: string = '';
  public cityCode: string = '';
  public phone: string = '';
}

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './inscription.html',
  styleUrls: ['./inscription.scss'],
})
export class Inscription {

  constructor(private http: HttpClient) {}

  public user: User = new User();
  public message: string = '';
  public passwordMismatch: boolean = false;

  sendFormData() {
    const pwd = (this.user.password || '').trim();
    const pwdConfirm = (this.user.passwordConfirm || '').trim();

    if (pwd !== pwdConfirm) {
      this.passwordMismatch = true;
      this.message = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.passwordMismatch = false;
  }

  formData = {
    email: '',
    motDePasse:'',
    confirmationMotDePasse:'',
    nom:'',
    prenom:'',
    adresse:'',
    mobile:''
  };

  register(){
    if (this.formData.motDePasse !== this.formData.confirmationMotDePasse) {
      console.error("Les mots de passe ne correspondent pas");
      return;
    }

    const data = {
      email: this.formData.email,
      motDePasse: this.formData.motDePasse,
      nom: this.formData.nom,
      prenom: this.formData.prenom,
      adresse: this.formData.adresse,
      mobile: this.formData.mobile
    };

  }
}
