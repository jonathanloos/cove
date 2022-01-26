import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResourcesPageRoutingModule } from './resources-routing.module';

import { ResourcesPage } from './resources.page';
import { ComponentModule } from 'src/app/shared/component.module';
import { ModalModule } from 'src/app/modals/modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    ModalModule,
    ResourcesPageRoutingModule
  ],
  declarations: [ResourcesPage]
})
export class ResourcesPageModule {}
