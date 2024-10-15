import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesLocationsPage } from './mes-locations.page';

const routes: Routes = [
  {
    path: '',
    component: MesLocationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesLocationsPageRoutingModule {}
