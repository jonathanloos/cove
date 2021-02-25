import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlaceService } from 'src/app/core/services/places/place.service';
import { ExternalAppService } from 'src/app/core/services/external-app/external-app.service';
import { UpdatePlaceService } from 'src/app/core/services/places/update-place.service';
import { Place } from 'src/models';
import { MutableModel } from "@aws-amplify/datastore";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
})
export class PlaceComponent implements OnInit {

  @Input() place: Place;
  @ViewChild('content') private content: any;

  editing: boolean = false;
  elementId:string = null;
  public PTGForm: FormGroup;

  constructor(
    private PlaceService: PlaceService,
    private externalService: ExternalAppService,
    private updatePTGService: UpdatePlaceService,
    private formBuilder: FormBuilder
    ) {

    updatePTGService.editChange.subscribe(result => {
      let curr = this.updatePTGService.getPlace();
      if(result){
        this.elementId = curr.id
      }else{
        this.elementId = null;
      }
      this.editing = result;
    });
   }
  
   ngOnInit() { 
    this.PTGForm = this.formBuilder.group({
      title: [this.place.title, Validators.required],
      description: [this.place.description],
      street: [this.place.address.street],
      city: [this.place.address.city],
      province: ['Ontario'],
      postalCode: [this.place.address.postalCode],
      country: ['Canada']
    })
  }

  launchMaps(address: any){
    this.externalService.launchMaps(address);
  }

  async cancel(){
    let curr = await this.PlaceService.get(this.place.id);
    this.PTGForm.setValue({
      title: curr.title,
      description: curr.description
    });
    this.updatePTGService.cancelOperation();
  }

  save(){
    const new_place = Place.copyOf(this.place, (mutable_sign: MutableModel<Place>) => {
      mutable_sign.title = this.PTGForm.value.title;
      mutable_sign.description = this.PTGForm.value.description;
      mutable_sign.address.street = this.PTGForm.value.street;
      mutable_sign.address.city = this.PTGForm.value.city;
      mutable_sign.address.province = this.PTGForm.value.province;
      mutable_sign.address.postalCode = this.PTGForm.value.postalCode;
      mutable_sign.address.country = this.PTGForm.value.country;
      return mutable_sign
    })

    this.updatePTGService.save(new_place);
  }
}
