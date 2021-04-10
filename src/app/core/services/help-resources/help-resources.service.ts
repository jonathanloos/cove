import { Injectable } from '@angular/core';
import { DataStore } from 'aws-amplify';
import { ReplaySubject, Subject } from 'rxjs';
import { FavouriteUserResources, HelpResource, User, WarningSign } from 'src/models';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HelpResourcesService {
  
  private help_resources: HelpResource[] = [];

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

  public async favourite(resource_id: string){
    const user = await this.authService.currentAuthenticatedUser();
    const resource = await DataStore.query(HelpResource, c => c.id("eq", resource_id)).then(result => {
      return result[0];
    });

    const favourite_resource = new FavouriteUserResources({user: user, resource: resource})
    await DataStore.save(favourite_resource).then(() => {this.userFavourites(favourite_resource.user.id);})
  }

  public async unfavourite(favouriteUserResourceId: string){
    const to_delete = await DataStore.query(FavouriteUserResources, favouriteUserResourceId);
    return await DataStore.delete(to_delete).then(() => {this.userFavourites(to_delete.user.id);});
  }

  public async userFavourites(userId: string){
    return await DataStore.query(FavouriteUserResources).then(res => {
      this.favourite_resources_change.next(res.filter(r => r.user.id == userId))
    })
  }
}
