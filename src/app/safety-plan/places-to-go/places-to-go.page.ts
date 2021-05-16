import { Component, OnInit, ViewChild } from '@angular/core';
import { ExternalAppService } from 'src/app/core/services/external-app/external-app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Address, Place, User } from 'src/models';
import { Subject, BehaviorSubject } from 'rxjs';
import { IonReorderGroup, ToastController } from '@ionic/angular';
import { EmptyStateObjectTransferService } from 'src/app/core/services/empty-state-object-transfer/empty-state-object-transfer.service';
import { ItemReorderEventDetail } from '@ionic/core';
import { PlaceService } from 'src/app/core/services/places/place.service';
@Component({
  selector: 'app-places-to-go',
  templateUrl: './places-to-go.page.html',
  styleUrls: ['./places-to-go.page.scss'],
})
export class PlacesToGoPage implements OnInit {
  
  @ViewChild('content') private content: any;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  currentUser: User;
  public user$ : Subject<User> = new BehaviorSubject<User>(null);
  public reordering = false;
  
  places: Place[];
  editing: boolean = false;
  adding:boolean = false;
  address: Address = new Address({
    street: "",
    city: "",
    province: "",
    country: "",
    postalCode: ""
  });
  
  latitude = undefined;
  longitude = undefined;

  public payload = {
    title: "Places To Go",
    description: "Changing your environment can help change your frame of mind. List safe spaces that help you feel comfortable.",
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
    private placesService: PlaceService,
    private externalService: ExternalAppService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private emptyStateTransferService: EmptyStateObjectTransferService,
    public toastController: ToastController
    ) {

    placesService.placesChange.subscribe(result => {
      this.places = result;
      if(this.places.length == 0){
        this.adding = true;
      }
    })

    this.PTGForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    })

    this.emptyStateTransferService.addEmptyStateToList.subscribe((place) => {
      this.savePlace(place);
    })
   }

  async ngOnInit() { 
    await this.authService.currentAuthenticatedUser().then(async (user) => {
      this.currentUser = user;
      this.user$.next(user)
      this.placesService.list(this.currentUser.id);
    });
  }

  toggleReorderGroup(ev) {
    this.placesService.list(this.currentUser.id);

    this.reordering = !this.reordering;
    if(this.reorderGroup != undefined){
      this.reorderGroup.disabled = !this.reorderGroup.disabled;
    }
  }

  async doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();

    let items = document.getElementsByClassName('reorder-item');
    let ids = [];
    for (var i = 0; i < items.length; i++) {
      ids.push(items[i].getAttribute('id'));
    };

    await this.placesService.orderIdResolver(ids);
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

  updateAddress(ev){
    this.address = new Address({
      street: ev.street,
      city: ev.city,
      province: ev.province,
      postalCode: ev.postalCode,
      country: ev.country
    });

    this.longitude = ev.longitude;
    this.latitude = ev.latitude;
  }

  async savePlace(place: any){

    const newPlace = new Place({
      title: place.title,
      description: place.description,
      address: this.address,
      longitude: this.longitude,
      latitude: this.latitude,
      userID: this.currentUser.id
    });

    await this.placesService.create(newPlace).then(() => {
      this.adding = !this.adding;
      this.presentToast("Added place to your list.", "primary")
    });
  }


  create(){
    const place = new Place({
      title: this.PTGForm.value.title,
      description: this.PTGForm.value.description,
      address: this.address,
      longitude: this.longitude,
      latitude: this.latitude,
      userID: this.currentUser.id
    })

    this.placesService.create(place);

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
