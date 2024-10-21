import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProprietaireMessagesPageRoutingModule } from './proprietaire-messages-routing.module';

import { ProprietaireMessagesPage } from './proprietaire-messages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProprietaireMessagesPageRoutingModule
  ],
  declarations: [ProprietaireMessagesPage]
})
export class ProprietaireMessagesPageModule {}
