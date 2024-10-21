import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule),


  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },

  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },

  {
    path: 'bienvenue',
    loadChildren: () => import('./bienvenue/bienvenue.module').then( m => m.BienvenuePageModule)
  },
  {
    path: 'favoris',
    loadChildren: () => import('./favoris/favoris.module').then( m => m.FavorisPageModule)
  },
  {
    path: 'profil-locataire',
    loadChildren: () => import('./profil-locataire/profil-locataire.module').then( m => m.ProfilLocatairePageModule)
  },
  {
    path: 'user-info',
    loadChildren: () => import('./user-info/user-info.module').then( m => m.UserInfoPageModule)
  },
  {
    path: 'proprietaire',
    loadChildren: () => import('./proprietaire/proprietaire.module').then( m => m.ProprietairePageModule)
  },
  {
    path: 'ajout-annonce',
    loadChildren: () => import('./ajout-annonce/ajout-annonce.module').then( m => m.AjoutAnnoncePageModule)
  },
  {
    path: 'profil-proprietaire',
    loadChildren: () => import('./profil-proprietaire/profil-proprietaire.module').then( m => m.ProfilProprietairePageModule)
  },
  {
    path: 'mes-annonces',
    loadChildren: () => import('./mes-annonces/mes-annonces.module').then( m => m.MesAnnoncesPageModule)
  },
  {
    path: 'edit-annonce',
    loadChildren: () => import('./edit-annonce/edit-annonce.module').then( m => m.EditAnnoncePageModule)
  },
  {
    path: 'mes-locations',
    loadChildren: () => import('./mes-locations/mes-locations.module').then( m => m.MesLocationsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'proprietaire-messages',
    loadChildren: () => import('./proprietaire-messages/proprietaire-messages.module').then( m => m.ProprietaireMessagesPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
