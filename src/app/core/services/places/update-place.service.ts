import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Place } from 'src/models';
import { PlaceService } from './place.service';
@Injectable({
  providedIn: 'root'
})
export class UpdatePlaceService {

  private updatedPlace: Place;
  public editing: boolean = false;
  editChange: Subject<boolean> = new Subject<boolean>();

  constructor(private PTGService: PlaceService) {  }

  async select(id: string){
    this.updatedPlace = await this.PTGService.get(id);
    this.editing = true;
    this.editChange.next(this.editing);
  }

  getPlace(): Place{
    return this.updatedPlace;
  }

  cancelOperation(){
    this.editing = false;
    this.editChange.next(this.editing);
  }

  save(place: Place){
    this.updatedPlace = place;
    this.PTGService.update(this.updatedPlace);
    this.editing = false;
    this.editChange.next(this.editing)
  }
}