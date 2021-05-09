import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlaceService } from 'src/app/core/services/places/place.service';
import { ExternalAppService } from 'src/app/core/services/external-app/external-app.service';
import { UpdatePlaceService } from 'src/app/core/services/places/update-place.service';
import { Place } from 'src/models';
import { MutableModel } from "@aws-amplify/datastore";
import { MapsAPILoader } from '@agm/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';

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
    private mapsAPILoader: MapsAPILoader,
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
      if (this.place.longitude == undefined && this.place.latitude == undefined){
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
      } else {
        this.constructMapsStaticUrl();
      }
      
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
    const new_place = Place.copyOf(this.place, (mutable_place: MutableModel<Place>) => {
      mutable_place.title = this.PTGForm.value.title;
      mutable_place.description = this.PTGForm.value.description;
      mutable_place.address.street = this.PTGForm.value.street;
      mutable_place.address.city = this.PTGForm.value.city;
      mutable_place.address.province = this.PTGForm.value.province;
      mutable_place.address.postalCode = this.PTGForm.value.postalCode;
      mutable_place.address.country = this.PTGForm.value.country;
      return mutable_place
    })

    this.updatePTGService.save(new_place);
  }

  async launchActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Launch Maps',
        role: 'getDirections',
        icon: 'navigate',
        handler: () => {
          this.mapsSelector();
        }
      }, {
        text: 'Edit',
        icon: 'create',
        handler: () => {
          this.updatePTGService.select(this.place.id);
        }
      }, {
        text: 'Delete',
        icon: 'trash',
        handler: () => {
          this.PlaceService.delete(this.place.id);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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
    let size = "150x150";

    if(this.place.description.length >= 130){
      size = "150x300";
    } else if (this.place.description.length >= 100) {
      size = "150x250"
    }

    const params = {
      center: formatted_address.replace(searchRegExp, '+'),
      zoom: '10',
      size: size,
      maptype: 'roadmap',
      markers: 'color:blue%7C' + this.place.latitude + ',' + this.place.longitude,
      key: 'AIzaSyDER16t6Erih2cQQzSyPI50sKtQ1EVcyPc'
    }
    let fullUrl = baseline
    for (let [key, value] of Object.entries(params)) {
      fullUrl += key + '=' + value + '&'
    }

    this.mapsURL$.next(fullUrl);
  }
}
