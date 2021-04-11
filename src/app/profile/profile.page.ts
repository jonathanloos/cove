import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable, Observer } from 'rxjs';
import { User } from 'src/models';
import { AuthService } from '../core/services/auth/auth.service';
import { UserService } from '../core/services/user/user.service';
import { MutableModel } from "@aws-amplify/datastore";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private user : User;
  public user$ = new Observable<User>((observer : Observer<User>) => {
    this.authService.currentUserSubject.subscribe(user => {
      this.user = user
      observer.next(user);
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
  public userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController
  ) { 
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])]
    })
  }

  async ngOnInit() { }

  async ionViewWillEnter(){
    this.user = await this.authService.currentAuthenticatedUser();
    this.userForm.controls['name'].setValue(this.user.name)
    this.userForm.controls['email'].setValue(this.user.email)
  }

  async update(){
    const updated_user = User.copyOf(this.user, (mutable_user: MutableModel<User>) => {
      mutable_user.name = this.userForm.value.name;
      mutable_user.email = this.userForm.value.email;
    })

    await this.authService.updateUser(updated_user).then(async () => {
      this.presentToast()
    });
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

  async signOut(){
    await this.authService.signOut().then(success => {
      this.router.navigateByUrl('/entry');
    }, error => {
      console.log(error)
    })
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'This will remove all data entered including your name and email.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Okay',
          handler: () => {
            // this.signOut();
          }
        }
      ]
    });

    await alert.present();
  }
}
