import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Reactive forms
import { FormsModule } from '@angular/forms'; // Template-driven forms
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// User Authentication Components
import { LoginComponent } from './user-auth/login/login.component';
import { RegisterComponent } from './user-auth/register/register.component';
import { UpdateUserComponent } from './user-auth/update-user/update-user.component';
import { UserslistComponent } from './user-auth/userslist/userslist.component';
import { ProfileComponent } from './user-auth/profile/profile.component';
import { ProfileUserComponent } from './user-auth/profile-user/profile-user.component';
import { ProfileAgentComponent } from './user-auth/profile-agent/profile-agent.component';
import { ChangepasswordComponent } from './user-auth/changepassword/changepassword.component';
import { Changepassword2UComponent } from './user-auth/changepassword2-u/changepassword2-u.component';

// Services and Interceptors
import { UsersService } from './service/users.service';
import { AuthInterceptor } from './service/auth.interceptor';

// Angular Material Modules
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Other Components
import { SidenavComponent } from './sidenav/sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { GenerCarteComponent } from './gener-carte/gener-carte.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { ListClientsComponent } from './agent/list-clients/list-clients.component';
import { TopnavComponent } from './agent/topnav/topnav.component';
import { LeftnavComponent } from './agent/leftnav/leftnav.component';
import { FactureComponent } from './factures/facture/facture.component';
import { CreancierDetailsComponent } from './factures/creancier-details/creancier-details.component';
import { VirementComponent } from './factures/virement/virement.component';
import { ComptesComponent } from './agent/comptes/comptes.component';
import { CarteDisplayComponent } from './client/carte-display/carte-display.component';
import { AddclientComponent } from './agent/addclient/addclient.component';
import { CryptoconvertComponent } from './client/cryptoconvert/cryptoconvert.component';
import { DashboardComponent } from './agent/dashboard/dashboard.component';
import { TranscationHistoryComponent } from './client/transcation-history/transcation-history.component';
import { BuyCryptoComponent } from './client/buy-crypto/buy-crypto.component';
import { BalanceDialogComponent } from './agent/balance-dialog/balance-dialog.component';
import { AbonnementsComponent } from './abonnements/abonnements.component';
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";

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
    ChangepasswordComponent,
    Changepassword2UComponent,
    FactureComponent,
    CreancierDetailsComponent,
    VirementComponent,
    ComptesComponent,
    CarteDisplayComponent,
    AddclientComponent,
    CryptoconvertComponent,
    DashboardComponent,
    TranscationHistoryComponent,
    BuyCryptoComponent,
    BalanceDialogComponent,
    AbonnementsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatOption,
    MatSelect,
  ],
  providers: [
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
