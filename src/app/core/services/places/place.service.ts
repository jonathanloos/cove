import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { DataStore } from '@aws-amplify/datastore'
import { Place } from 'src/models';
import { SortDirection } from 'aws-amplify';
import { MutableModel } from "@aws-amplify/datastore";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  public places: Place[] = [];

  public placesChange: Subject<Place[]> = new Subject<Place[]>();

  constructor( ) {  }

  public async list(userId : string) {
    return await DataStore.query(Place, p => p.userID("eq", userId), {
      sort: p => p.order(SortDirection.ASCENDING),
    }).then((results : any) => {
      this.places = results;

      // Temp method to backfill order, too lazy to write a migration
      if(this.places.length > 0 && this.places[0].order == undefined){
        for(var i = 0; i < this.places.length; i++){
          const new_place = Place.copyOf(this.places[i], (mutable_place: MutableModel<Place>) => {
            mutable_place.order = i;
            return mutable_place
          });
          DataStore.save(new_place);
        }
      }

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

  public orderIdResolver(placeIdsInOrder: any[]){
    placeIdsInOrder.forEach(async (id, index) => {
      let place = await DataStore.query(Place, id);

      const updated_place = Place.copyOf(place, (mutable_place: MutableModel<Place>) => {
        mutable_place.order = index;
        return mutable_place
      });
      await DataStore.save(updated_place)
    });
  }
}