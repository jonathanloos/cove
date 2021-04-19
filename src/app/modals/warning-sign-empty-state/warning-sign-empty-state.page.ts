import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { EmptyStateObjectTransferService } from 'src/app/core/services/empty-state-object-transfer/empty-state-object-transfer.service';
import { WarningSign } from 'src/models';

@Component({
  selector: 'app-warning-sign-empty-state',
  templateUrl: './warning-sign-empty-state.page.html',
  styleUrls: ['./warning-sign-empty-state.page.scss'],
})
export class WarningSignEmptyStatePage implements OnInit {
  @Input() userID: string;
  @Input() payload: string;
  
  commonWarningSigns = [
    {
      title: "Unable to sleep or sleeping all of the time.",
      description: "Changes in your sleep pattern can affect your thoughts and mood. Monitor your sleep to make sure you're getting enough, but not using it as a means to avoid other things."
    },
    {
      title: "Withdrawal from friends, family and society",
      description: "Isolation can make you feel safe, but can also make you feel unsupported. It is important to keep connections with loved ones strong and healthy, even during the hard times."
    },
    {
      title: "Dramatic mood changes",
      description: "Mood changes can be a sign that you may be feeling stressed or anxious."
    },
    {
      title: "Increased substance use (alcohol or drug)",
      description: "Although they may help some feel secure, outlets like substances can be dangerous if abused."
    },
    {
      title: "Feelings of helplessness or hopelessness",
      description: "Sometimes it may seem like you're on an island, but there is always hope and support."
    }
  ]
  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    private objTransferService: EmptyStateObjectTransferService
    ) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  addToList(signPosition: number){
    var sign = this.commonWarningSigns[signPosition]
    const warningSign = new WarningSign({
      title: sign.title,
      description: sign.description,
      userID: this.userID
    });
    this.presentAlertConfirm(warningSign);
  }

  async presentAlertConfirm(sign: WarningSign) {
    const message = `
      <ion-card class="brainstorm-card m-0 text-left">
        <ion-card-header class="card-header-border p-2" style="color: var(--ion-color-primary);">
          <ion-text class="display-medium" color="primary"><small>${sign.title}</small></ion-text>
        </ion-card-header>
        <ion-card-content class="p-2">
          <p>${sign.description}</p>
        </ion-card-content>
      </ion-card>
    `
    const alert = await this.alertController.create({
      header: 'Add this to your list of warning sign?',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          handler: () => {
            // this.saveWarningSign(sign)
            this.objTransferService.doTransfer(sign);
          }
        }
      ]
    });

    await alert.present();
  }
}
