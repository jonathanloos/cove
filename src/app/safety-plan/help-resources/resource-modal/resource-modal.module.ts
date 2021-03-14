import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResourceModalPageRoutingModule } from './resource-modal-routing.module';

import { ResourceModalPage } from './resource-modal.page';
import { SafeUrlPipe } from 'src/app/core/services/pipe/safe-url.pipe';
import { GlobalPipesModule } from 'src/app/global-pipes/global-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResourceModalPageRoutingModule,
    GlobalPipesModule
  ],
  declarations: [ResourceModalPage]
})
export class ResourceModalPageModule {}
