import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth/auth.service';
import { CopingStrategiesService } from '../core/services/coping-strategies/coping-strategies.service';
import { ContactService } from '../core/services/contacts/contact.service';
import { PlaceService } from '../core/services/places/place.service';
import { WarningSignsService } from '../core/services/warning-signs/warning-signs.service';
import { User } from 'src/models';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-safety-plan',
  templateUrl: 'safety-plan.page.html',
  styleUrls: ['safety-plan.page.scss']
})
export class SafetyPlanPage {

  currentUser: User;
  
  menu_items = [
    {
      icon: "heart",
      path:"warning-signs",
      title: "Warning Signs",
      details: []
    },
    {
      icon: "flash",
      path:"coping-strategies",
      title: "Coping Strategies",
      details: []
    },
    {
      icon: "people",
      path:"people-to-call",
      title: "People To Call",
      details: []
    },
    {
      icon: "home",
      path:"places-to-go",
      title: "Places To Go",
      details: []
    }
  ];

  constructor(
    private warningSignService: WarningSignsService,
    private authService: AuthService,
    private copingStrategyService: CopingStrategiesService,
    private ContactService: ContactService,
    private PlaceService: PlaceService,
    public toastController: ToastController,
    ) {}

  async ngOnInit(){  }

  async ionViewWillEnter(){
    await this.authService.currentAuthenticatedUser().then(async (user) => {
      this.currentUser = user;
      this.presentToast(this.currentUser.name, 'success')
      await this.warningSignService.list(this.currentUser.id).then((signs : any) => {
        this.menu_items[0].details = [];
        if(signs.length > 0){
          for(let sign of signs.slice(0, 2)){
            this.menu_items[0].details.push(sign.title.substring(0,20) + "...")
          };
        }else{
          this.menu_items[0].details.push("Log your first warning sign here.")
        }
      });
  
      await this.copingStrategyService.list(this.currentUser.id).then((strategies : any) => {
        this.menu_items[1].details = [];
        if(strategies.length > 0){
          for(let strategy of strategies.slice(0, 2)){
            this.menu_items[1].details.push(strategy.title.substring(0,20) + "...")
          };
        }else{
          this.menu_items[1].details.push("Log your first coping strategy here.")
        }
      });
  
      await this.ContactService.list(this.currentUser.id).then((contacts : any) => {
        this.menu_items[2].details = [];
        if(contacts.length > 0){
          for(let contact of contacts.slice(0, 2)){
            this.menu_items[2].details.push(contact.name + "...")
          };
        }else{
          this.menu_items[2].details.push("Log your first contact here.")
        }
      });
  
      await this.PlaceService.list(this.currentUser.id).then((places : any) => {
        this.menu_items[3].details = [];
        if(places.length > 0){
          for(let place of places.slice(0, 2)){
            this.menu_items[3].details.push(place.title.substring(0,20) + "...")
          };
        }else{
          this.menu_items[3].details.push("Log your first place here.")
        }
      });
    })
    .catch((err) => {this.presentToast(err, 'danger')});
  }

  async presentToast(message: string, type: string) {
    const toast = await this.toastController.create({
      message: message,
      color: type,
      duration: 2000
    });
    await toast.present();
  }
}
