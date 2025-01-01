import { Component } from '@angular/core';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.css'
})
export class FactureComponent {
  categories = [
    {
      title: "Téléphonie et Internet",
      icon: "phone",
      options: ["Option 1", "Option 2", "Option 3"],
      open: false
    },
    {
      title: "Eau et Electricité",
      icon: "water",
      options: ["Option 1", "Option 2"],
      open: false
    },
    {
      title: "Taxes et Administrations",
      icon: "account_balance",
      options: ["Option 1", "Option 2", "Option 3"],
      open: false
    },
    {
      title: "Transport et Billetterie",
      icon: "flight",
      options: ["Option 1", "Option 2"],
      open: false
    },
    {
      title: "Ecoles et Universités",
      icon: "school",
      options: ["Option 1"],
      open: false
    },
    {
      title: "Associations",
      icon: "group",
      options: ["Option 1", "Option 2"],
      open: false
    }
  ];

  toggleCategory(category: any): void {
    category.open = !category.open;
  }

}
