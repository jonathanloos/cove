import { Component, OnInit, ViewChild, ElementRef, NgZone, Input, EventEmitter, Output } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-google-maps-search-bar',
  templateUrl: './google-maps-search-bar.component.html',
  styleUrls: ['./google-maps-search-bar.component.scss'],
})
export class GoogleMapsSearchBarComponent implements OnInit {
  
  @Input() current_address: String;
  @Output() addressChanged: EventEmitter<Object> = new EventEmitter<Object>();
  
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    if(this.current_address == undefined){
      this.current_address = "Search Locations"
    }
    
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, { componentRestrictions: { country: "ca" } });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
  
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

          // Emit the selected address to save when the form is submitted
          let formatted_street = place.address_components[0].long_name + ' ' + place.address_components[1].short_name
          this.addressChanged.emit({
            street: formatted_street,
            city: place.address_components[2].long_name,
            province: place.address_components[place.address_components.length - 3].long_name,
            country: "Canada",
            postalCode: place.address_components[place.address_components.length - 1].long_name,
            latitude: this.latitude,
            longitude: this.longitude
          });
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
  
    });
  }

}
