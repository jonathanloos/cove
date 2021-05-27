import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/models';
import { MutableModel } from "@aws-amplify/datastore";
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})
export class ProfileModalComponent implements OnInit {
  @Input() user : User;
  
  public updateUserForm: FormGroup;

  constructor(
    public toastController: ToastController,
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) { 
  }

  ngOnInit() { 
    this.updateUserForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      bio: [this.user.bio, Validators.maxLength(140)]
    });
  }

  async saveUser(){
    console.log(this.updateUserForm.value)
    console.log(this.updateUserForm.valid)
    const updated_user = User.copyOf(this.user, (mutable_user: MutableModel<User>) => {
      mutable_user.name = this.updateUserForm.value.name;
      mutable_user.bio = this.updateUserForm.value.bio;
    });

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

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
