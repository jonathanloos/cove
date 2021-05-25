import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { EmptyStateObjectTransferService } from 'src/app/core/services/empty-state-object-transfer/empty-state-object-transfer.service';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent implements OnInit {

  @Input() userID: string;
  @Input() payload;

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    private objTransferService: EmptyStateObjectTransferService
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async presentAlertConfirm(obj) {
    const message = `
      <ion-card class="brainstorm-card m-0 text-left">
        <ion-card-header class="card-header-border p-2 text-primary">
          <ion-text class="display-medium" color="primary"><small>${obj.title}</small></ion-text>
        </ion-card-header>
        <ion-card-content class="p-2">
          <p>${obj.description}</p>
        </ion-card-content>
      </ion-card>
    `
    const alert = await this.alertController.create({
      header: "Add this to your list of " + this.payload.title.toLowerCase() + "?",
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Add',
          handler: () => {
            this.objTransferService.doTransfer(obj);
          }
        }
      ]
    });

    await alert.present();
  }

}
