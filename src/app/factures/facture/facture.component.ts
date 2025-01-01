import { Component, OnInit } from '@angular/core';
import { CreancierService } from '../../service/creancier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.css'
})
export class FactureComponent implements OnInit {
  categories: any[] = [];

  constructor(private creancierService: CreancierService,private router: Router) {}

  ngOnInit() {
    this.creancierService.getGroupedCreanciers().subscribe(data => {
      this.categories = Object.keys(data).map(key => ({
        title: key,
        icon: this.getIconForCategory(key), // Add an icon based on category type
        options: data[key].map(creancier => ({
          nom: creancier.nom,
          img: creancier.img
        })),
        open: false
      }));
    });
  }

  toggleCategory(category: any) {
    category.open = !category.open;
  }

  getIconForCategory(category: string): string {
    switch (category) {
      case 'Téléphonie et Internet':
        return 'phone';
      case 'Eau et Electricité':
        return 'water';
      default:
        return 'category';
    }
  }

  redirectToCreancierDetails(creancier: any) {
    this.router.navigate(['/creancier-details'], { state: { creancier } });
  }
  
}