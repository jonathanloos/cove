import { Component, OnInit, ViewChild } from '@angular/core';
import { PlaceService } from 'src/app/core/services/places/place.service';
import { ExternalAppService } from 'src/app/core/services/external-app/external-app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Place, User } from 'src/models';
import { Subject, BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { EmptyStateObjectTransferService } from 'src/app/core/services/empty-state-object-transfer/empty-state-object-transfer.service';

@Component({
  selector: 'app-places-to-go',
  templateUrl: './places-to-go.page.html',
  styleUrls: ['./places-to-go.page.scss'],
})
export class PlacesToGoPage implements OnInit {
  
  @ViewChild('content') private content: any;

  currentUser: User;
  public user$ : Subject<User> = new BehaviorSubject<User>(null);
  
  places: Place[];
  editing: boolean = false;
  adding:boolean = false;

  public payload = {
    title: "Places To Go",
    description: "Sometimes changing your environment can affect your mood in positive ways.",
    list_prompt: "Here are some common places you can use in your safety plan:",
    items: [
      {
        title: "Friend's House",
        description: "I'm comfortable there, they let me stay as long as I want and it's never a bother to them."
      },
      {
        title: "Therapists Office",
        description: "I can book an appointment pretty quickly and they help me process."
      },
      {
        title: "Coffee Shop",
        description: "The busyness helps distract me and I like their coffee."
      }
    ]
  }

  public PTGForm: FormGroup;

  constructor(
    private PlaceService: PlaceService,
    private externalService: ExternalAppService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private emptyStateTransferService: EmptyStateObjectTransferService,
    public toastController: ToastController
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

    this.emptyStateTransferService.addEmptyStateToList.subscribe((place) => {
      this.savePlace(place);
    })
   }

  async ngOnInit() { 
    await this.authService.currentAuthenticatedUser().then(async (user) => {
      this.currentUser = user;
      this.user$.next(user)
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

  async savePlace(place: any){
    const newPlace = new Place({
      title: place.title,
      description: place.description,
      address: {
        street: "",
        city: "",
        postalCode: "",
        province: "Ontario",
        country: "Canada"
      },
      userID: this.currentUser.id
    })
    await this.PlaceService.create(newPlace).then(() => {
      this.presentToast("Added place to your list.", "primary")
    });
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

  async presentToast(message: string, type: string) {
    const toast = await this.toastController.create({
      message: message,
      color: type,
      duration: 2000
    });
    await toast.present();
  }
}
