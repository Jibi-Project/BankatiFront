import { Component } from '@angular/core';
import { ECarteService } from '../service/e-carte.service'
import { UsersService } from '../service/users.service';
@Component({
  selector: 'app-gener-carte',
  templateUrl: './gener-carte.component.html',
  styleUrl: './gener-carte.component.css'
})
export class GenerCarteComponent {

  email: string | null = null;
  eCarte: any = null;
  errorMessage: string='';
  ngOnInit(): void {
    this.email = this.userService.getUserEmail();
  }
  constructor(private eCarteService: ECarteService,private userService:UsersService) {
    this.email = this.userService.getUserEmail();
  }


  generateCard(): void {
    if (this.email) {
      this.eCarteService.genererECarte(this.email).subscribe({
        next: (response) => {
          this.eCarte = response;  // Stocke la réponse dans eCarte
          this.errorMessage = '';  // Réinitialise l'erreur en cas de succès
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la génération de la carte.';  // Affiche un message d'erreur en cas d'échec
          console.error(err);  // Affiche l'erreur dans la console pour le débogage
        }
      });
    } else {
      this.errorMessage = 'Veuillez vous connecter pour générer une e-carte.';  // Message d'erreur si aucun utilisateur n'est connecté
    }
  }
}
