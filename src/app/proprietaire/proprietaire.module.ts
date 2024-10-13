import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import from @angular/forms

import { IonicModule } from '@ionic/angular';
import { ProprietairePageRoutingModule } from './proprietaire-routing.module';

import { ProprietairePage } from './proprietaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProprietairePageRoutingModule,
    ReactiveFormsModule // Correctly imported
  ],
  declarations: [ProprietairePage]
})
export class ProprietairePageModule {}
