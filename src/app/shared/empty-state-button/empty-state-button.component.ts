import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmptyStateModalPage } from 'src/app/modals/empty-state-modal/empty-state-modal.page';

@Component({
  selector: 'app-empty-state-button',
  templateUrl: './empty-state-button.component.html',
  styleUrls: ['./empty-state-button.component.scss'],
})
export class EmptyStateButtonComponent implements OnInit {

  @Input() modalPage;
  @Input() userID;
  @Input() payload;
  
  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: EmptyStateModalPage,//this.modalPage,
      componentProps: {
        'userID': this.userID,
        'payload': this.payload
      }
    });
    return await modal.present();
  }
}
