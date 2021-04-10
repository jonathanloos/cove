import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { HelpResourcesService } from 'src/app/core/services/help-resources/help-resources.service';
import { FavouriteUserResources, HelpResource, User } from 'src/models';
import { ResourceModalPage } from './resource-modal/resource-modal.page';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage implements OnInit {

  public helpResources: any;
  public favouriteResources: any = [];
  public currentUser: User;

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
    await this.helpResourcesService.favourite(resource_id)
  }

  async unfavourite(favouriteResourceId: string){
    await this.helpResourcesService.unfavourite(favouriteResourceId);
  }

}
