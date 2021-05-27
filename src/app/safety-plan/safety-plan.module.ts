import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafetyPlanPage } from './safety-plan.page';
import { ComponentModule } from '../shared/component.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentModule,
    RouterModule.forChild([{ path: '', component: SafetyPlanPage }])
  ],
  declarations: [SafetyPlanPage]
})
export class SafetyPlanPageModule {}
