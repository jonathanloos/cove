import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CopingStrategiesPageRoutingModule } from './coping-strategies-routing.module';

import { CopingStrategiesPage } from './coping-strategies.page';
import { CopingStrategiesService } from 'src/app/core/services/coping-strategies/coping-strategies.service';
import { UpdateCopingStrategyService } from 'src/app/core/services/coping-strategies/update-coping-strategy.service';
import { ComponentModule } from 'src/app/shared/component.module';
import { StrategyComponent } from './strategy/strategy.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CopingStrategiesPageRoutingModule,
    ComponentModule
  ],
  providers: [
    CopingStrategiesService,
    UpdateCopingStrategyService
  ],
  declarations: [
    CopingStrategiesPage,
    StrategyComponent
  ]
})
export class CopingStrategiesPageModule {}
