import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotdePasseOublierPage } from './motde-passe-oublier.page';

const routes: Routes = [
  {
    path: '',
    component: MotdePasseOublierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotdePasseOublierPageRoutingModule {}
