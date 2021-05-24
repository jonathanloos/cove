import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { User, WarningSign } from 'src/models';
import { AuthService } from '../core/services/auth/auth.service';
import { UserService } from '../core/services/user/user.service';
import { MutableModel } from "@aws-amplify/datastore";
import { ResourceDetailModalComponent } from '../modals/resource-detail-modal/resource-detail-modal.component';
import { ProfileModalComponent } from '../modals/profile-modal/profile-modal.component';
import { WarningSignsService } from '../core/services/warning-signs/warning-signs.service';
import { CopingStrategiesService } from '../core/services/coping-strategies/coping-strategies.service';
import { PlaceService } from '../core/services/places/place.service';
import { ContactService } from '../core/services/contacts/contact.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private user : User;
  public warningSignCount$ = new BehaviorSubject<number>(0);
  public copingStrategyCount$ = new BehaviorSubject<number>(0);
  public placesCount$ = new BehaviorSubject<number>(0);
  public contactsCount$ = new BehaviorSubject<number>(0);

  public user$ = new Observable<User>((observer : Observer<User>) => {
    this.authService.currentUserSubject.subscribe(user => {
      this.user = user
      observer.next(user);

      this.warningSignService.list(user.id).then((signs : any[]) => this.warningSignCount$.next(signs.length))
      this.copingStrategyService.list(user.id).then((strategies : any[]) => this.copingStrategyCount$.next(strategies.length))
      this.placesToGoService.list(user.id).then((places : any[]) => this.placesCount$.next(places.length))
      this.contactService.list(user.id).then((contacts : any[]) => this.contactsCount$.next(contacts.length))
    })
  });

  menu_items = [
    {
      icon: "mail",
      title: "Contact Us"
    },
    {
      icon: "information-circle",
      title: "About Us"
    },
    {
      icon: "bookmarks",
      title: "Terms And Conditions"
    },
    {
      icon: "hand",
      title: "Privacy Policy"
    },
  ]

  constructor(
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController,
    private warningSignService: WarningSignsService,
    private copingStrategyService: CopingStrategiesService,
    private placesToGoService: PlaceService,
    private contactService: ContactService
      ) { }

  async ngOnInit() { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Successfully updated profile!',
      color: "success",
      duration: 2000
    });
    toast.present();
  }

  openWebsite(){
    window.open('http://trycove.ca', '_system', 'location=yes');
  }

  async settings(){
    const modal = await this.modalController.create({
      component: ProfileModalComponent,
      componentProps: {
        'user' : this.user
      }
    });
    return await modal.present();
  }

  share(){}

  async signOut(){
    await this.authService.signOut().then(success => {
      this.router.navigateByUrl('/entry');
    }, error => {
      console.log(error)
    })
  }
}
