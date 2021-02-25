import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { EditPopoverComponent } from '../edit-popover/edit-popover.component';

@Component({
  selector: 'app-ellipsis',
  templateUrl: './ellipsis.component.html',
  styleUrls: ['./ellipsis.component.scss'],
})
export class EllipsisComponent implements OnInit {

  @Input() id: number;
  @Input() type: string;

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: EditPopoverComponent,
      event: ev,
      translucent: true,
      componentProps: {
        type : this.type,
        id: this.id
      },
      keyboardClose: true
    });

    return await popover.present();
  }
}
