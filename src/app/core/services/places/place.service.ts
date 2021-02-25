import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { DataStore } from '@aws-amplify/datastore'
import { Place } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  public places: Place[] = [];

  public placesChange: Subject<Place[]> = new Subject<Place[]>();

  constructor( ) {  }

  public async list(userId : string) {
    return await DataStore.query(Place, c => c.userID("eq", userId)).then((results : any) => {
      this.places = results;
      this.placesChange.next(this.places);
      return this.places;
    })
    .catch(err => {console.log(err)})
  }

  async get(id: string) {
    return await DataStore.query(Place, id)
      .then((result : any) => {return result})
      .catch(err => {console.log(err)})
    }

  async update(place: Place) {
    await DataStore.save(place).then((result : Place) => {
      let index = this.places.findIndex(obj => obj.id == result.id)
      this.places[index] = result;
      this.placesChange.next(this.places);
    })
    .catch(err => {console.log(err)})
  }

  async create(place: Place) {
    await DataStore.save(place).then((result : Place) => {
      this.list(result.userID)
    })
    .catch(err => {console.log(err)})
  }

  async delete(id: string) {
    const todoDelete = await DataStore.query(Place, id)
    await DataStore.delete(todoDelete).then((result : Place) => {
      this.list(result.userID);
    })
    .catch(err => {console.log(err)})
  }
}