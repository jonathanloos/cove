import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeopleToCallPageRoutingModule } from './people-to-call-routing.module';

import { PeopleToCallPage } from './people-to-call.page';
import { ComponentModule } from 'src/app/shared/component.module';
import { PersonComponent } from './person/person.component';
import { SafeUrlPipe } from 'src/app/core/services/pipe/safe-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    ReactiveFormsModule,
    PeopleToCallPageRoutingModule
  ],
  providers:[],
  declarations: [PeopleToCallPage, PersonComponent, SafeUrlPipe]
})
export class PeopleToCallPageModule {}
