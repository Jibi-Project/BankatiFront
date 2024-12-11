import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../service/users.service'; // Assurez-vous que le service est bien importé

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  username: string | null = null;
  constructor(private router: Router,private authService: UsersService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.username = user.username;
      }
    });
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  logout(): void {
    this.authService.logout();
  }
  goBack(): void {
    this.router.navigate(['/']); // Redirection vers la page d'accueil, ou utilisez window.history.back()
  }

}