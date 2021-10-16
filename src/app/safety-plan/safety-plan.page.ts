import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-safety-plan',
  templateUrl: './safety-plan.page.html',
  styleUrls: ['./safety-plan.page.scss'],
})
export class SafetyPlanPage implements OnInit {

  selectedPath = '';
  constructor(private menuController: MenuController, router: Router){
    router.events.subscribe((event: RouterEvent) => {
      if(event && event.url){
        this.selectedPath = event.url;
      }
    })
  };

  ngOnInit(){};

  async openMenu(){
    await this.menuController.open();
  }

}
