import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-auth/login/login.component';
import { RegisterComponent } from './user-auth/register/register.component';
import { adminGuard, usersGuard } from './service/users.guard';
import { ProfileComponent } from './user-auth/profile/profile.component';
import { UpdateUserComponent } from './user-auth/update-user/update-user.component';
import { UserslistComponent } from './user-auth/userslist/userslist.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate: [adminGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [usersGuard]},
  {path: 'update/:id', component: UpdateUserComponent, canActivate: [adminGuard]},
  {path: 'users', component: UserslistComponent, canActivate:[adminGuard]},
  {path: '**', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
