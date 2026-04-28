import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Connexion } from './pages/connexion/connexion';
import { Inventaire } from './pages/inventaire/inventaire';
import { Inscription } from './pages/Inscription/inscription';
import { Map } from './pages/map/map';
import {MdpOublie} from './pages/mdp_oublie/mdp_oublie';

export const routes: Routes = [
  { path: 'home', component: Accueil },
  { path: 'inscription', component: Inscription },
  { path: 'connexion', component: Connexion },
  { path: 'inventaire', component: Inventaire },
  { path: 'MdpOublie', component: MdpOublie },
  { path: 'map', component: Map }
];
