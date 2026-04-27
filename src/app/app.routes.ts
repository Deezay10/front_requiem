import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Connexion } from './pages/connexion/connexion';
import { Inventaire } from './pages/inventaire/inventaire';
import { Inscription } from './pages/Inscription/inscription';

export const routes: Routes = [
  { path: 'home', component: Accueil },
  { path: 'inscription', component: Inscription },
  { path: 'connexion', component: Connexion },
  { path: 'inventaire', component: Inventaire },
];
