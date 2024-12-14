import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrl: './leftnav.component.css'
})
export class LeftnavComponent implements OnInit {
  profileInfo: any;
  errorMessage: string = '';

  constructor(
    private readonly userService: UsersService, // Assurez-vous que 'UsersService' est correctement importé
    private readonly router: Router
  ) {}

  // La méthode ngOnInit est définie une seule fois
  async ngOnInit() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No Token Found');
      }

      this.profileInfo = await this.userService.getYourProfile(token);
    } catch (error: any) {
      this.showError(error.message);
    }
  }

  // Définissez cette méthode si elle n'existe pas encore
  showError(message: string) {
    this.errorMessage = message;
    // Vous pouvez également ajouter un affichage d'erreur dans l'interface utilisateur si nécessaire
    console.error(message); // Optionnel : loguer l'erreur dans la console pour le débogage
  }
}

