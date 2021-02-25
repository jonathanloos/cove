import { Component, OnInit, ViewChild } from '@angular/core';
import { PlaceService } from 'src/app/core/services/places/place.service';
import { ExternalAppService } from 'src/app/core/services/external-app/external-app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Place, User } from 'src/models';

@Component({
  selector: 'app-places-to-go',
  templateUrl: './places-to-go.page.html',
  styleUrls: ['./places-to-go.page.scss'],
})
export class PlacesToGoPage implements OnInit {
  
  @ViewChild('content') private content: any;

  currentUser: User;
  currentUserSubscription: Subscription;
  
  places: Place[];
  editing: boolean = false;
  adding:boolean = false;


  public PTGForm: FormGroup;

  constructor(
    private PlaceService: PlaceService,
    private externalService: ExternalAppService,
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) {

    PlaceService.placesChange.subscribe(result => {
      this.places = result;
      if(this.places.length == 0){
        this.adding = true;
      }
    })

    this.PTGForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      street: [''],
      city: [''],
      province: ['Ontario'],
      postalCode: [''],
      country: ['Canada']
    })
   }

  async ngOnInit() { 
    await this.authService.currentAuthenticatedUser().then(async (user) => {
      this.currentUser = user;
      this.PlaceService.list(this.currentUser.id);
    });
  }

  launchMaps(address: any){
    this.externalService.launchMaps(address);
  }

  displayForm(){
    this.adding = true;
  }

  reset(){
    this.adding = false;
    this.PTGForm.reset();
  }

  create(){
    const place = new Place({
      title: this.PTGForm.value.title,
      description: this.PTGForm.value.description,
      address: {
          street: this.PTGForm.value.street,
          city: this.PTGForm.value.city,
          province: this.PTGForm.value.province,
          postalCode: this.PTGForm.value.postalCode,
          country: this.PTGForm.value.country,

      },
      userID: this.currentUser.id
    })

    this.PlaceService.create(place);

    this.reset();
  }
}
