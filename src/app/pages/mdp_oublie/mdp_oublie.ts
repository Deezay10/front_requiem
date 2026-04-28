import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-mdp-oublie',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './mdp_oublie.html',
  styleUrls: ['./mdp_oublie.scss'],
})
export class MdpOublie {
  public email: string = '';
  public message: string = '';

  constructor(private http: HttpClient) {}

  sendReset() {
    const emailTrimmed = (this.email || '').trim();

    if (!emailTrimmed) {
      this.message = 'Veuillez entrer votre email.';
      return;
    }

    this.http.post('http://localhost:3000/reset-password', { email: emailTrimmed }).subscribe({
      next: (res: any) => {
        this.message = res?.message || 'Un email de réinitialisation a été envoyé !';
      },
      error: (err) => {
        console.error('Erreur reset password :', err);
        this.message = 'Erreur serveur ou email introuvable.';
      },
    });
  }
}
