import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EllipsisComponent } from './ellipsis/ellipsis.component';
import { EditPopoverComponent } from './edit-popover/edit-popover.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './get-help/modal/modal.component';



@NgModule({
  declarations: [EllipsisComponent, EditPopoverComponent, ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports:[
    EllipsisComponent
  ],
  bootstrap:[EditPopoverComponent]
})
export class ComponentModule { }
