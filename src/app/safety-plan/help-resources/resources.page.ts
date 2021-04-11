import { Component, OnInit, ViewChild } from '@angular/core';
import { IonReorderGroup, ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { HelpResourcesService } from 'src/app/core/services/help-resources/help-resources.service';
import { FavouriteUserResources, HelpResource, User } from 'src/models';
import { ResourceModalPage } from './resource-modal/resource-modal.page';
import { ItemReorderEventDetail } from '@ionic/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage implements OnInit {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  
  public helpResources: any;
  public favouriteResources: any = [];
  public currentUser: User;

  public reordering = false;

  public favouriteResources$ : Subject<FavouriteUserResources[]> = new BehaviorSubject<FavouriteUserResources[]>([]);
  public otherResources$ : Subject<HelpResource[]> = new BehaviorSubject<HelpResource[]>([]);

  constructor(
      public modalController: ModalController,
      private helpResourcesService: HelpResourcesService,
      private authService: AuthService
    ) {
      this.helpResourcesService.favourite_resources_change.subscribe(favouriteResources => {
        this.favouriteResources = favouriteResources;
        this.favouriteResources$.next(favouriteResources);
      });

      this.helpResourcesService.resources_change.subscribe(resources => {
        this.helpResources = resources;
        // Filter out the favourites
        this.favouriteResources$.subscribe(favs => {
          let fav_ids = favs.map(r => r.resource.id)
          this.otherResources$.next(resources.filter((resource) => {
            if (!fav_ids.includes(resource.id)){
              return resource
            }
          }));
        });
      });
    }

  async ngOnInit() {
    await this.authService.currentAuthenticatedUser().then(async (user) => {
      this.currentUser = user;
      this.helpResourcesService.userFavourites(user.id);
      this.helpResourcesService.list();
    });
  }

  toggleReorderGroup(ev) {
    this.helpResourcesService.userFavourites(this.currentUser.id);
    this.reordering = !this.reordering;
    if(this.reorderGroup != undefined){
      this.reorderGroup.disabled = !this.reorderGroup.disabled;
    }
  }

  async doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();

    let items = document.getElementsByClassName('reorder-item');
    let ids = [];
    for (var i = 0; i < items.length; i++) {
      ids.push(items[i].getAttribute('id'));
    };

    await this.helpResourcesService.orderIdResolver(ids);
  }

  async displayInfo(resource_id: number){
    const resource = this.helpResources.filter((filtered_resource) => {
      if(filtered_resource.id == resource_id){
        return filtered_resource;
      }
    });

    const modal = await this.modalController.create({
      component: ResourceModalPage,
      componentProps: {
        'resource' : resource
      }
    });
    return await modal.present();
  }

  async favourite(resource_id: string){
    let order = 0;
    await this.favouriteResources$.subscribe(res => { order  = res.length });
    await this.helpResourcesService.favourite(resource_id, order);
  }

  async unfavourite(favouriteResourceId: string){
    await this.helpResourcesService.unfavourite(favouriteResourceId);
  }

}
