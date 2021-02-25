import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  resources = [
    {
      name: "Kids Help Phone",
      phone: 18006686868,
      description: "People you can trust.",
      avatar: "../../assets/avatars/khp.png"
    },
    {
      name: "HERE 24/7",
      phone: 18444373247,
      description: "Here for you around the clock.",
      avatar: "../../assets/avatars/Here-247.png"
    },
    {
      name: "Good 2 Talk",
      phone: 18444373247,
      description: "Here for you around the clock.",
      avatar: "../../assets/avatars/Here-247.png"
    }
  ]

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss();
  }
}
