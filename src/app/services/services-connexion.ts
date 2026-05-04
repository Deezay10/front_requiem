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

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getUser() !== null;
  }

  logout() {
    this.user = null;
    sessionStorage.removeItem('user');
  }
}
