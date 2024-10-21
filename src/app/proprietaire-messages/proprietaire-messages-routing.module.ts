import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProprietaireMessagesPage } from './proprietaire-messages.page';

const routes: Routes = [
  {
    path: '',
    component: ProprietaireMessagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProprietaireMessagesPageRoutingModule {}
