import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import du service Router
import { ECarteService } from '../service/e-carte.service';
import { UsersService } from '../service/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
@Component({
  selector: 'app-gener-carte',
  templateUrl: './gener-carte.component.html',
  styleUrls: ['./gener-carte.component.css']
})
export class GenerCarteComponent {

  email: string | null = null;
  eCarte: any = null;
  errorMessage: string = '';

  constructor(private eCarteService: ECarteService,
              private userService: UsersService,
              private router: Router,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.email = this.userService.getUserEmail();
  }

  // Méthode pour générer la carte
  generateCard(): void {
    if (this.email) {
      this.eCarteService.genererECarte(this.email).subscribe({
        next: (response) => {
          this.eCarte = response;  // Stocke la réponse dans eCarte
          this.errorMessage = '';  // Réinitialise l'erreur en cas de succès
          this.dialog.open(DialogContentComponent, {
            width: '400px',
            data: { eCarte: this.eCarte }
          });
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

  // Méthode pour voir la carte
  viewCard(): void {
    if (this.eCarte) {
      this.router.navigate(['/card-details'], { // Navigation vers la page des détails
        queryParams: { eCarte: JSON.stringify(this.eCarte) }
      });
    }
  }
}
