import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WarningSignsPageRoutingModule } from './warning-signs-routing.module';

import { WarningSignsPage } from './warning-signs.page';
import { ComponentModule } from 'src/app/shared/component.module';
import { SignComponent } from './sign/sign.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    WarningSignsPageRoutingModule,
    ComponentModule
  ],
  declarations: [WarningSignsPage, SignComponent]
})
export class WarningSignsPageModule {}
