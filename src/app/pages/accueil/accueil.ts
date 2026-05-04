import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit {
  messages: { text: string; isUser: boolean }[] = [];
  newMessage: string = '';

  constructor() {}

  ngOnInit(): void {
    // Petit message de bienvenue local uniquement
    this.messages.push({
      text: 'Mode maintenance : le chat est déconnecté du back-end.',
      isUser: false,
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      // On affiche ton message dans la bulle
      this.messages.push({ text: this.newMessage, isUser: true });

      // On ajoute une réponse automatique simple pour éviter l'erreur 404/500
      this.messages.push({ text: 'Le service IA est actuellement en pause.', isUser: false });

      this.newMessage = ''; // On vide l'input
      // AUCUN APPEL API ICI -> Zéro erreur console
    }
  }
}
