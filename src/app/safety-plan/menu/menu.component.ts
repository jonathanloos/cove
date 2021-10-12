import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ContactService } from 'src/app/core/services/contacts/contact.service';
import { CopingStrategiesService } from 'src/app/core/services/coping-strategies/coping-strategies.service';
import { PlaceService } from 'src/app/core/services/places/place.service';
import { WarningSignsService } from 'src/app/core/services/warning-signs/warning-signs.service';
import { User } from 'src/models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  currentUser: User;
  what = "WHAT"
  
  menu_items = [
    {
      icon: "heart",
      path:"/app/safety-plan/warning-signs",
      title: "Warning Signs",
      details: []
    },
    {
      icon: "flash",
      path:"/app/safety-plan/coping-strategies",
      title: "Coping Strategies",
      details: []
    },
    {
      icon: "people",
      path:"/app/safety-plan/people-to-call",
      title: "People To Call",
      details: []
    },
    {
      icon: "home",
      path:"/app/safety-plan/places-to-go",
      title: "Places To Go",
      details: []
    },
    {
      icon: "book",
      path:"/app/resources",
      title: "Resources",
      details: [
        "24hr services",
        "Helplines and centers"
      ]
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
