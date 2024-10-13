import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesAnnoncesPage } from './mes-annonces.page';

const routes: Routes = [
  {
    path: '',
    component: MesAnnoncesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesAnnoncesPageRoutingModule {}
