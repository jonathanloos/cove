import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WarningSignEmptyStatePageRoutingModule } from './warning-sign-empty-state-routing.module';

import { WarningSignEmptyStatePage } from './warning-sign-empty-state.page';
import { ComponentModule } from 'src/app/shared/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WarningSignEmptyStatePageRoutingModule,
    ComponentModule
  ],
  declarations: [WarningSignEmptyStatePage]
})
export class WarningSignEmptyStatePageModule {}
