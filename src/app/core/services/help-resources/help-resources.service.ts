import { Injectable } from '@angular/core';
import { DataStore } from 'aws-amplify';
import { Subject } from 'rxjs';
import { HelpResource, WarningSign } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class HelpResourcesService {
  
  private help_resources: HelpResource[] = [];

  public resources_change: Subject<HelpResource[]> = new Subject<HelpResource[]>();

  constructor() { }

  public async list() {
    return await DataStore.query(HelpResource).then((results : HelpResource[]) => {
      this.help_resources = results;
      console.log(results)
      return this.help_resources;
    })
    .catch(err => {console.log(err)})
  }
}
