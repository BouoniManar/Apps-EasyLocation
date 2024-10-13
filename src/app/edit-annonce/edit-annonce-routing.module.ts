import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAnnoncePage } from './edit-annonce.page';

const routes: Routes = [
  {
    path: '',
    component: EditAnnoncePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAnnoncePageRoutingModule {}
