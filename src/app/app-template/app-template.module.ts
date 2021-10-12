import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppTemplatePageRoutingModule } from './app-template-routing.module';

import { AppTemplatePage } from './app-template.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppTemplatePageRoutingModule
  ],
  declarations: [AppTemplatePage]
})
export class AppTemplatePageModule {}
