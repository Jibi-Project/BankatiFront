import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user-auth/login/login.component';
import { RegisterComponent } from './user-auth/register/register.component';
import { UpdateUserComponent } from './user-auth/update-user/update-user.component';
import { UserslistComponent } from './user-auth/userslist/userslist.component';
import { ProfileComponent } from './user-auth/profile/profile.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { SidenavComponent } from './sidenav/sidenav/sidenav.component'; // Import nécessaire
import { MatListModule } from '@angular/material/list'; // Pour <mat-nav-list>
import { MatDividerModule } from '@angular/material/divider'; // Pour <mat-divider>
import { MatIconModule } from '@angular/material/icon'; // Pour <mat-icon
import { MatButtonModule } from '@angular/material/button'; // Si vous utilisez des boutons
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card'; // Module pour <mat-card>
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { GenerCarteComponent } from './gener-carte/gener-carte.component';
import { UsersService } from './service/users.service';
import { AuthInterceptor } from './service/auth.interceptor';
import { CardDetailsComponent } from './card-details/card-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { ListClientsComponent } from './agent/list-clients/list-clients.component';
import { TopnavComponent } from './agent/topnav/topnav.component';
import { LeftnavComponent } from './agent/leftnav/leftnav.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { ProfileUserComponent } from './user-auth/profile-user/profile-user.component';
import { ProfileAgentComponent } from './user-auth/profile-agent/profile-agent.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UpdateUserComponent,
    UserslistComponent,
    ProfileComponent,
    SidenavComponent,
    HeaderComponent,
    GenerCarteComponent,
    CardDetailsComponent,
    DialogContentComponent,
    ListClientsComponent,
    TopnavComponent,
    LeftnavComponent,
    ProfileUserComponent,
    ProfileAgentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatListModule, // Ajouter MatListModule
    MatDividerModule, // Ajouter MatDividerModule
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    
  ],
  providers: [
    UsersService,  // Fournir le service d'utilisateur pour l'authentification
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Déclare l'intercepteur
      multi: true, // Cela permet d'ajouter plusieurs intercepteurs si nécessaire
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }