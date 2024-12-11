import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsersService } from './users.service';



export const usersGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService);
  const router = inject(Router);

  console.log('usersGuard - Checking access to:', state.url); // Log de la route
  console.log('usersGuard - isAuthenticated:', usersService.isAuthenticated());

  if (usersService.isAuthenticated()) {
    console.log('usersGuard - Access granted to:', state.url);
    return true; // Accès autorisé
  } else {
    console.log('usersGuard - Access denied. Redirecting to /login');
    router.navigate(['/login']);
    return false;
  }
};



export const adminGuard: CanActivateFn = (route, state) => {
  if (inject(UsersService).isAdmin()) {
    return true;
  }else{
    inject(Router).navigate(['/login'])
    return false
  }
};
