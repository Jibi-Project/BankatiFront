import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import de ActivatedRoute
import { UsersService } from '../service/users.service'; // Assurez-vous que vous avez un service pour l'utilisateur

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  profileInfo: any;  // Informations du profil de l'utilisateur
  eCarte: any = null; // Variable pour stocker les données de la carte

  constructor(
    private route: ActivatedRoute,
    private userService: UsersService // Injecter votre service utilisateur
  ) {}

  ngOnInit(): void {
    // Récupérer les paramètres de la route pour obtenir les informations de la carte
    this.route.queryParams.subscribe(params => {
      if (params['eCarte']) {
        this.eCarte = JSON.parse(params['eCarte']); // On parse les données JSON
        console.log(this.eCarte); // Affiche les données de la carte dans la console pour vérification
      }
    });

    // Récupérer le token et les informations de profil de l'utilisateur
    this.loadUserProfile();
  }

  // Méthode pour charger le profil de l'utilisateur
  async loadUserProfile() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No Token Found');
      }

      // Assurez-vous que la méthode getYourProfile existe dans votre service UserService
      this.profileInfo = await this.userService.getYourProfile(token);
      console.log(this.profileInfo);  // Affiche les informations du profil dans la console
    } catch (error: any) {
      console.error('Error loading profile:', error.message);
      this.showError(error.message); // Si vous avez une méthode showError pour afficher les erreurs
    }
  }

  // Méthode pour afficher les erreurs (si vous en avez une)
  showError(message: string) {
    // Code pour afficher une erreur (par exemple, une alerte ou un toast)
    alert(message);
  }
  
}
