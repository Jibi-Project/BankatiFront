import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-auth/login/login.component';
import { RegisterComponent } from './user-auth/register/register.component';
import { adminGuard, usersGuard } from './service/users.guard';
import { ProfileComponent } from './user-auth/profile/profile.component';
import { UpdateUserComponent } from './user-auth/update-user/update-user.component';
import { UserslistComponent } from './user-auth/userslist/userslist.component';
import { GenerCarteComponent } from './gener-carte/gener-carte.component';  // Ajustez le chemin selon la structure de votre projet
import { CardDetailsComponent } from './card-details/card-details.component';
import { ListClientsComponent } from './agent/list-clients/list-clients.component';
import { ProfileUserComponent } from './user-auth/profile-user/profile-user.component';
import { ProfileAgentComponent } from './user-auth/profile-agent/profile-agent.component';
import { ChangepasswordComponent } from './user-auth/changepassword/changepassword.component';
import { Changepassword2UComponent } from './user-auth/changepassword2-u/changepassword2-u.component';
import { FactureComponent } from './factures/facture/facture.component';
import { CreancierDetailsComponent } from './factures/creancier-details/creancier-details.component';
import { VirementComponent } from './factures/virement/virement.component';
import { ComptesComponent } from './agent/comptes/comptes.component';
import { CarteDisplayComponent } from './client/carte-display/carte-display.component';
import { AddclientComponent } from './agent/addclient/addclient.component';
import { CryptoService } from './service/crypto.service';
import { CryptoconvertComponent } from './client/cryptoconvert/cryptoconvert.component';
import { DashboardComponent } from './agent/dashboard/dashboard.component';
import { TranscationHistoryComponent } from './client/transcation-history/transcation-history.component';
import { BuyCryptoComponent } from './client/buy-crypto/buy-crypto.component';
import { AbonnementsComponent } from './abonnements/abonnements.component';
import { SellCryptoComponent } from './client/sell-crypto/sell-crypto.component';
import { CryptoTransactionsComponent } from './client/crypto-transactions/crypto-transactions.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate: [usersGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [usersGuard]},
  {path: 'update/:id', component: UpdateUserComponent, canActivate: [adminGuard]},
  {path: 'users', component: UserslistComponent, canActivate:[adminGuard]},
  { path: 'generCarte', component: GenerCarteComponent ,canActivate: [usersGuard]},
  { path: 'card-details', component: CardDetailsComponent },
  {path:'agent',component:ListClientsComponent},
  {path:'userprofile',component:ProfileUserComponent},
  {path:'listeClient',component:ListClientsComponent},
  {path:"agentprofile",component:ProfileAgentComponent},
  {path:"changepwd",component:ChangepasswordComponent},
  {path:"changepwd2u",component:Changepassword2UComponent},
  {path:"facture",component:FactureComponent},
  { path: 'creancier-details', component: CreancierDetailsComponent },
  {path:"virement",component:VirementComponent},
  {path:"comptes",component:ComptesComponent},
  {path:"ecarte" ,component:CarteDisplayComponent},
  {path:"add",component:AddclientComponent},
  {path:"cryptoConvert",component:CryptoconvertComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"history",component:TranscationHistoryComponent},
  {path:"buyCrypto",component:BuyCryptoComponent},
  {path:"abonnements",component:AbonnementsComponent},
  {path:"Sell",component:SellCryptoComponent},
  {path:"cryptoHistory",component:CryptoTransactionsComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }