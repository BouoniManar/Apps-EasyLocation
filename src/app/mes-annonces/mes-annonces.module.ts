import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesAnnoncesPageRoutingModule } from './mes-annonces-routing.module';

import { MesAnnoncesPage } from './mes-annonces.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesAnnoncesPageRoutingModule
  ],
  declarations: [MesAnnoncesPage]
})
export class MesAnnoncesPageModule {}
