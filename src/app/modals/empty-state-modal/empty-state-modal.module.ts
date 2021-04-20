import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmptyStateModalPageRoutingModule } from './empty-state-modal-routing.module';

import { EmptyStateModalPage } from './empty-state-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmptyStateModalPageRoutingModule
  ],
  declarations: [EmptyStateModalPage]
})
export class EmptyStateModalPageModule {}
