import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacesToGoPageRoutingModule } from './places-to-go-routing.module';

import { PlacesToGoPage } from './places-to-go.page';
import { ComponentModule } from 'src/app/shared/component.module';
import { PlaceComponent } from './place/place.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PlacesToGoPageRoutingModule,
    ComponentModule
  ],
  declarations: [
    PlacesToGoPage,
    PlaceComponent
  ]
})
export class PlacesToGoPageModule {}
