import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilProprietairePageRoutingModule } from './profil-proprietaire-routing.module';

import { ProfilProprietairePage } from './profil-proprietaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilProprietairePageRoutingModule
  ],
  declarations: [ProfilProprietairePage]
})
export class ProfilProprietairePageModule {}
