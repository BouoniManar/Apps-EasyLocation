import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesLocationsPageRoutingModule } from './mes-locations-routing.module';

import { MesLocationsPage } from './mes-locations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesLocationsPageRoutingModule
  ],
  declarations: [MesLocationsPage]
})
export class MesLocationsPageModule {}
