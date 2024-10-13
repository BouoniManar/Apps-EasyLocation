import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilLocatairePage } from './profil-locataire.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilLocatairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilLocatairePageRoutingModule {}
