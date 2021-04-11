import { Injectable } from '@angular/core';
import { DataStore, SortDirection } from 'aws-amplify';
import { ReplaySubject, Subject } from 'rxjs';
import { FavouriteUserResources, HelpResource, User, WarningSign } from 'src/models';
import { AuthService } from '../auth/auth.service';
import { MutableModel, Predicates } from "@aws-amplify/datastore";

@Injectable({
  providedIn: 'root'
})
export class HelpResourcesService {
  
  private help_resources: HelpResource[] = [];
  private favourite_resources: FavouriteUserResources[] = [];

  public favourite_resources_change: Subject<FavouriteUserResources[]> = new ReplaySubject<FavouriteUserResources[]>();
  public resources_change: Subject<HelpResource[]> = new ReplaySubject<HelpResource[]>();

  constructor(private authService: AuthService) { }

  public async list() {
    return await DataStore.query(HelpResource).then(async (results : HelpResource[]) => {
      this.help_resources = results;
      this.resources_change.next(results)
      return this.help_resources;
    })
    .catch(err => {console.log(err)})
  }

  public async favourite(resource_id: string, order: number){
    const user = await this.authService.currentAuthenticatedUser();
    const resource = await DataStore.query(HelpResource, resource_id);

    const favourite_resource = new FavouriteUserResources({user: user, resource: resource, order: order})
    await DataStore.save(favourite_resource).then((res) => {this.userFavourites(favourite_resource.user.id);})
  }

  public async unfavourite(favouriteUserResourceId: string){
    const to_delete = await DataStore.query(FavouriteUserResources, favouriteUserResourceId);
    return await DataStore.delete(to_delete).then(async () => {
      // Get all elements that were ordered after the target and decrement their order by 1
      await this.userFavourites(to_delete.user.id);
      this.favourite_resources.forEach(async (item) => {
        if(item.order > to_delete.order){
          const updated_favourite_resource = FavouriteUserResources.copyOf(item, (mutable_sign: MutableModel<FavouriteUserResources>) => {
            mutable_sign.order = mutable_sign.order - 1;
            return mutable_sign
          });
          await DataStore.save(updated_favourite_resource)
        }
      });

      this.userFavourites(to_delete.user.id);
    });
  }

  public async userFavourites(userId: string){
    return await DataStore.query(FavouriteUserResources, Predicates.ALL, {
        sort: s => s.order(SortDirection.ASCENDING)
      }).then(res => {
        this.favourite_resources = res;
        this.favourite_resources_change.next(res.filter(r => r.user.id == userId))
      })
  }

  public orderIdResolver(favouriteResourceIdsInOrder: any[]){
    let userId = undefined;

    favouriteResourceIdsInOrder.forEach(async (id, index) => {
      let favouriteResource = await DataStore.query(FavouriteUserResources, id);
      if(userId == undefined){
        userId = favouriteResource.user.id;
      }

      const updated_favourite_resource = FavouriteUserResources.copyOf(favouriteResource, (mutable_sign: MutableModel<FavouriteUserResources>) => {
        mutable_sign.order = index;
        return mutable_sign
      });
      await DataStore.save(updated_favourite_resource)
    });
  }
}
