import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-resource-detail-modal',
  templateUrl: './resource-detail-modal.component.html',
  styleUrls: ['./resource-detail-modal.component.scss'],
})
export class ResourceDetailModalComponent implements OnInit {
  
  @Input() resource;
  phone_url: String = "";
  sms_url: String = "";

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    if(this.resource[0].phone.number != undefined){
      this.phone_url = "tel:" + this.resource[0].phone.number ;
    }

    if(this.resource[0].sms.number != undefined){
      this.sms_url = "sms:/" + this.resource[0].sms.number;
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
