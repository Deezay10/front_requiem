import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Connexion } from './pages/connexion/connexion';
import { Inventaire } from './pages/inventaire/inventaire';

export const routes: Routes = [
  { path: 'accueil', component: Accueil },
  { path: 'connexion', component: Connexion },
  { path: 'inventaire', component: Inventaire },
];
