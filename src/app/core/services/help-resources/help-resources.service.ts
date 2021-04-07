import { Injectable } from '@angular/core';
import { DataStore } from 'aws-amplify';
import { Subject } from 'rxjs';
import { FavouriteUserResources, HelpResource, WarningSign } from 'src/models';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HelpResourcesService {
  
  private help_resources: HelpResource[] = [];

  public favourite_resources_change: Subject<HelpResource[]> = new Subject<HelpResource[]>();

  constructor(private authService: AuthService) { }

  public async list() {
    return await DataStore.query(HelpResource).then((results : HelpResource[]) => {
      this.help_resources = results;
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
    await DataStore.save(favourite_resource).then((res) => {
      this.favourite_resources_change.next();
      console.log(res)
    })
  }
}
