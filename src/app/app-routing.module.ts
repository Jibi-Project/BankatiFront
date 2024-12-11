import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-auth/login/login.component';
import { RegisterComponent } from './user-auth/register/register.component';
import { adminGuard, usersGuard } from './service/users.guard';
import { ProfileComponent } from './user-auth/profile/profile.component';
import { UpdateUserComponent } from './user-auth/update-user/update-user.component';
import { UserslistComponent } from './user-auth/userslist/userslist.component';
import { GenerCarteComponent } from './gener-carte/gener-carte.component';  // Ajustez le chemin selon la structure de votre projet

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate: [usersGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [usersGuard]},
  {path: 'update/:id', component: UpdateUserComponent, canActivate: [adminGuard]},
  {path: 'users', component: UserslistComponent, canActivate:[adminGuard]},
  { path: 'generCarte', component: GenerCarteComponent ,canActivate: [usersGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }