import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesConnexion {

  private user: any = null;

  setUser(user: any) {
    this.user = user;
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    if (!this.user) {
      const stored = sessionStorage.getItem('user');
      this.user = stored ? JSON.parse(stored) : null;
    }
    return this.user;
  }

  isLoggedIn() {
    return this.getUser() !== null;
  }

  logout() {
    this.user = null;
    sessionStorage.removeItem('user');
  }
}
