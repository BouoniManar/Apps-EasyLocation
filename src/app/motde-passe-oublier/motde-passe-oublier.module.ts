import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MotdePasseOublierPageRoutingModule } from './motde-passe-oublier-routing.module';

import { MotdePasseOublierPage } from './motde-passe-oublier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotdePasseOublierPageRoutingModule
  ],
  declarations: [MotdePasseOublierPage]
})
export class MotdePasseOublierPageModule {}
