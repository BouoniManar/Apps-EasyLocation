import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilProprietairePage } from './profil-proprietaire.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilProprietairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilProprietairePageRoutingModule {}
