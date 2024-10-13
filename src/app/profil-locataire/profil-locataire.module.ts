import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilLocatairePageRoutingModule } from './profil-locataire-routing.module';

import { ProfilLocatairePage } from './profil-locataire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilLocatairePageRoutingModule
  ],
  declarations: [ProfilLocatairePage]
})
export class ProfilLocatairePageModule {}
