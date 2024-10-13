import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProprietairePage } from './proprietaire.page';

const routes: Routes = [
  {
    path: '',
    component: ProprietairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProprietairePageRoutingModule {}
