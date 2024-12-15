import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private BASE_URL = "http://localhost:8222";
  private apiUrl = 'http://localhost:8222/users/admin'; // Base URL for your API


  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);  // Définir un BehaviorSubject
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();  // Observable à exposer

  constructor(private http: HttpClient,private router: Router) { }

  toggleLockUser(userId: number, lock: boolean): Observable<any> {
    const endpoint = lock ? `/lock/${userId}` : `/unlock/${userId}`;
    return this.http.put(`${this.apiUrl}${endpoint}`, {});
  }

  /** Authentification */
  async login(email: string, password: string): Promise<any> {
    const url = `${this.BASE_URL}/users/auth/login`;
    try {
      const response = await this.http.post<any>(url, { email, password }).toPromise(); // Pas besoin d'async/await ici, mais cela fonctionne
      this.setSession(response);  // Sauvegarder les informations d'utilisateur dans le sessionStorage ou localStorage
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Méthode pour enregistrer l'utilisateur dans le sessionStorage ou localStorage
  private setSession(userData: any) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', userData.token);  // Sauvegarde du token dans le localStorage
      localStorage.setItem('role', userData.role);  // Sauvegarde du rôle de l'utilisateur
      this.currentUserSubject.next(userData);  // Mettre à jour l'utilisateur courant
    }
  }

  // Méthode pour la déconnexion
  logout(): void {
    if (typeof localStorage !== 'undefined') {
      // Supprimer les informations du localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');

      // Mettre à jour l'observable currentUserSubject
      this.currentUserSubject.next(null);

      // Rediriger l'utilisateur vers la page de login (ou toute autre page souhaitée)
      this.router.navigate(['/login']);
    }
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  // Vérifier si l'utilisateur est un administrateur
  isAdmin(): boolean {
    if (typeof localStorage !== 'undefined') {
      const role = localStorage.getItem('role');
      return role === 'ADMIN';
    }
    return false;
  }

  // Vérifier si l'utilisateur est un utilisateur classique
  isUser(): boolean {
    if (typeof localStorage !== 'undefined') {
      const role = localStorage.getItem('role');
      return role === 'USER';
    }
    return false;
  }

  /** API Calls */
  async register(userData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/users/auth/register`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    try {
      const response = await this.http.post<any>(url, userData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers(token: string): Promise<any> {
    const url = `${this.BASE_URL}/users/admin/get-all-users`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getYourProfile(token: string): Promise<any> {
    const url = `${this.BASE_URL}/users/adminuser/get-profile`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUsersById(userId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/users/admin/get-users/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    try {
      const response = await this.http.get<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId: string, token: string): Promise<any> {
    const url = `${this.BASE_URL}/users/admin/delete/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    try {
      const response = await this.http.delete<any>(url, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId: string, userData: any, token: string): Promise<any> {
    const url = `${this.BASE_URL}/users/admin/update/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    try {
      const response = await this.http.put<any>(url, userData, { headers }).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');  // ou sessionStorage
  }
  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      try {
        // Décoder le token JWT et récupérer l'ID de l'utilisateur
        const payload = JSON.parse(atob(token.split('.')[1])); // Décodage du JWT (partie payload)
        console.log('Payload du JWT:', payload);  // Ajout d'un log pour vérifier le payload
        return payload.userId;  // Retourne l'ID de l'utilisateur à partir du payload
      } catch (error) {
        console.error('Erreur lors du décodage du token JWT:', error);  // Affiche l'erreur si le décodage échoue
        return null;
      }
    }
    return null;
  }

  getUserEmail(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        // Décoder le token JWT et récupérer l'email de l'utilisateur
        const payload = JSON.parse(atob(token.split('.')[1])); // Décodage du JWT (partie payload)
        console.log('Payload du JWT:', payload); // Ajout d'un log pour vérifier le payload
        return payload.sub; // Retourne l'email de l'utilisateur à partir du champ "sub"
      } catch (error) {
        console.error('Erreur lors du décodage du token JWT:', error); // Affiche l'erreur si le décodage échoue
        return null;
      }
    }
    return null;
  }
  
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Assumes the JWT is stored in localStorage
    });

    const body = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    return this.http.post(`${this.BASE_URL}/users/change-password`, body, { headers });
  }
  
}
