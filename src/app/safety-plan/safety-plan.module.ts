import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SafetyPlanPageRoutingModule } from './safety-plan-routing.module';

import { SafetyPlanPage } from './safety-plan.page';
import { MenuComponent } from './menu/menu.component';
import { TopToolbarComponent } from '../shared/top-toolbar/top-toolbar.component';
import { ComponentModule } from '../shared/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    SafetyPlanPageRoutingModule
  ],
  providers: [TopToolbarComponent],
  declarations: [MenuComponent, SafetyPlanPage]
})
export class SafetyPlanPageModule {}
