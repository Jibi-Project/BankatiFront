import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';  // Importez le service qui gère l'authentification

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: UsersService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérer le token d'authentification
    const token = this.authService.getToken();

    // Afficher le token dans la console pour vérifier qu'il est correct
    console.log('Token:', token); // Pour vérifier le token dans la console

    if (token) {
      // Si un token est trouvé, l'ajouter à l'en-tête de la requête
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      // Passer la requête modifiée à la chaîne de traitement
      return next.handle(cloned);
    } else {
      // Si aucun token, continuer sans ajouter l'en-tête
      return next.handle(req);
    }
  }
}
