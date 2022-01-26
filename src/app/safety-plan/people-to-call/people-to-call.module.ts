import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeopleToCallPageRoutingModule } from './people-to-call-routing.module';

import { PeopleToCallPage } from './people-to-call.page';
import { ComponentModule } from 'src/app/shared/component.module';
import { PersonComponent } from './person/person.component';
import { GlobalPipesModule } from 'src/app/global-pipes/global-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    ReactiveFormsModule,
    PeopleToCallPageRoutingModule,
    GlobalPipesModule
  ],
  providers:[],
  declarations: [PeopleToCallPage, PersonComponent]
})
export class PeopleToCallPageModule {}
