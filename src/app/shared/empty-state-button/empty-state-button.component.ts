import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmptyStateComponent } from 'src/app/modals/empty-state/empty-state.component';

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
      component: EmptyStateComponent,
      componentProps: {
        'userID': this.userID,
        'payload': this.payload
      }
    });
    return await modal.present();
  }
}
