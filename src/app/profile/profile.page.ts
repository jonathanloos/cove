import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { User } from 'src/models';
import { AuthService } from '../core/services/auth/auth.service';
import { ProfileModalComponent } from '../modals/profile-modal/profile-modal.component';
import { WarningSignsService } from '../core/services/warning-signs/warning-signs.service';
import { CopingStrategiesService } from '../core/services/coping-strategies/coping-strategies.service';
import { PlaceService } from '../core/services/places/place.service';
import { ContactService } from '../core/services/contacts/contact.service';
import Storage from '@aws-amplify/storage';

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
      if(user){
        this.user = user
        observer.next(user);
        this.warningSignService.list(user.id).then((signs : any[]) => this.warningSignCount$.next(signs.length))
        this.copingStrategyService.list(user.id).then((strategies : any[]) => this.copingStrategyCount$.next(strategies.length))
        this.placesToGoService.list(user.id).then((places : any[]) => this.placesCount$.next(places.length))
        this.contactService.list(user.id).then((contacts : any[]) => this.contactsCount$.next(contacts.length))
      }
    })
  });

  public imageUrl$ = new BehaviorSubject<Object | String>('../../../assets/icons/icon-128x128.png')

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
    private contactService: ContactService,
    public loadingController: LoadingController
    ) { }

  async ngOnInit() { 
    this.user$.subscribe(async (user) => {
      const result = await Storage.list(`${user.userSub}-profilePicture.png`, { 
        level: 'private'
      });

      if(result.length > 0){
        const imageUrl = await Storage.get(`${user.userSub}-profilePicture.png`, { level: 'private'})
        this.imageUrl$.next(imageUrl)
      }
    })
  }

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
      this.router.navigateByUrl('/welcome');
    }, error => {
      console.log(error)
    })
  }

  async uploadFile(e){
    const file = e.target.files[0];

    const loading = await this.loadingController.create({
      message: 'Uploading your image...',
      duration: 2000
    });

    await loading.present();

    const key = await Storage.put(`${this.user.userSub}-profilePicture.png`, file, {
      contentType: 'image/png',
      level: 'private'
    });

    loading.dismiss();

    const imageUrl = await Storage.get(`${this.user.userSub}-profilePicture.png`, { level: 'private'})
    this.imageUrl$.next(imageUrl)
  }

  openFileBrowser(e){
    e.preventDefault();
    let element : HTMLElement = document.getElementById('profilePictureUpload') as HTMLElement;
    element.click();
  }
}
