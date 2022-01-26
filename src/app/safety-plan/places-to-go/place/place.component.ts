import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlaceService } from 'src/app/core/services/places/place.service';
import { ExternalAppService } from 'src/app/core/services/external-app/external-app.service';
import { UpdatePlaceService } from 'src/app/core/services/places/update-place.service';
import { Place } from 'src/models';
import { MutableModel } from "@aws-amplify/datastore";
import { Subject, BehaviorSubject } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { environment } from '../../../../environments/environment';

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
  private geoCoder;
  public mapsURL$ : Subject<String> = new BehaviorSubject<String>(null);

  constructor(
    private PlaceService: PlaceService,
    private externalService: ExternalAppService,
    private updatePTGService: UpdatePlaceService,
    private formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController
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
      if (this.place.longitude == undefined && this.place.latitude == undefined && this.place.address.street != ''){
        this.geoCoder = new google.maps.Geocoder;
        let formatted_address = this.place.address.street + ', ' + this.place.address.city + ', ' + this.place.address.postalCode
        let g_address = this.geoCoder.geocode({ 'address': formatted_address }, (results, status) => {

          const new_place = Place.copyOf(this.place, (mutable_place: MutableModel<Place>) => {
            mutable_place.longitude = results[0].geometry.location.lng();
            mutable_place.latitude = results[0].geometry.location.lat();
          });

          this.updatePTGService.save(new_place);
          this.constructMapsStaticUrl();
          // TODO: Handle if the place couldn't be found.
        });
      } else if (this.place.longitude != undefined && this.place.latitude != undefined) {
        this.constructMapsStaticUrl();
      }
      
      this.PTGForm = this.formBuilder.group({
        title: [this.place.title, Validators.required],
        description: [this.place.description]
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

  updateAddress(ev){
    const new_place = Place.copyOf(this.place, (mutable_place: MutableModel<Place>) => {
      mutable_place.address.street = ev.street;
      mutable_place.address.city = ev.city;
      mutable_place.address.province = ev.province;
      mutable_place.address.postalCode = ev.postalCode;
      mutable_place.address.country = ev.country;
      mutable_place.latitude = ev.latitude
      mutable_place.longitude = ev.longitude
      return mutable_place
    });

    this.place = new_place;
  }

  save(){
    const new_place = Place.copyOf(this.place, (mutable_place: MutableModel<Place>) => {
      mutable_place.title = this.PTGForm.value.title;
      mutable_place.description = this.PTGForm.value.description;
      return mutable_place
    })

    this.updatePTGService.save(new_place);
  }

  mapsSelector() {
    let url = "";
    if /* if we're on iOS, open in Apple Maps */
      ((navigator.platform.indexOf("iPhone") != -1) || 
      (navigator.platform.indexOf("iPad") != -1) || 
      (navigator.platform.indexOf("iPod") != -1))
      {
        url = "maps://maps.google.com/maps?daddr=" + this.place.latitude + ", " + this.place.longitude + "&amp;ll="
      }
    else /* else use Google */
      {
        url = "https://maps.google.com/maps?daddr=" + this.place.latitude + ", " + this.place.longitude + "&amp;ll="
      }

    window.open(url);
  }


  constructMapsStaticUrl(){
    // let fullUrl = "https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyDER16t6Erih2cQQzSyPI50sKtQ1EVcyPc"
    const baseline = "https://maps.googleapis.com/maps/api/staticmap?"
    const formatted_address = this.place.address.street + ', ' + this.place.address.city + ', ' + this.place.address.postalCode
    const searchRegExp = /\s/g;
    let size = "150x200";

    if(this.place.description.length >= 130 || this.place.title.length >= 20){
      size = "150x300";
    } else if (this.place.description.length >= 90) {
      size = "150x250";
    }

    const params = {
      center: formatted_address.replace(searchRegExp, '+'),
      zoom: '12',
      size: size,
      maptype: 'roadmap',
      markers: 'color:blue%7C' + this.place.latitude + ',' + this.place.longitude,
      key: environment.GCP_MAPS_API_KEY
    }
    let fullUrl = baseline
    for (let [key, value] of Object.entries(params)) {
      fullUrl += key + '=' + value + '&'
    }
    
    this.mapsURL$.next(fullUrl);
  }
}
