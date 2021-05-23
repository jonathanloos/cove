import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EllipsisComponent } from './ellipsis/ellipsis.component';
import { EditPopoverComponent } from './edit-popover/edit-popover.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './get-help/modal/modal.component';
import { EmptyStateButtonComponent } from './empty-state-button/empty-state-button.component';
import { GoogleMapsSearchBarComponent } from './google-maps-search-bar/google-maps-search-bar.component';
import { AgmCoreModule } from '@agm/core';
import { ElementToolbarComponent } from './element-toolbar/element-toolbar.component';



@NgModule({
  declarations: [
    EllipsisComponent, 
    EditPopoverComponent, 
    ModalComponent, 
    EmptyStateButtonComponent,
    GoogleMapsSearchBarComponent,
    ElementToolbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgmCoreModule
  ],
  exports:[
    EllipsisComponent,
    EmptyStateButtonComponent,
    GoogleMapsSearchBarComponent,
    ElementToolbarComponent
  ],
  bootstrap:[EditPopoverComponent]
})
export class ComponentModule { }
