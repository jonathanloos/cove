import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/models';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private user: User;
  registerForm: FormGroup;
  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false,
    allowTouchMove: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController
    ) { 
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {   }

  ionViewWillEnter(){  }

  async proceedToVerification(){
    if(this.registerForm.valid){
      this.signUpUser();
    }else{
      await this.presentToast("Please make sure form fields are filled out correctly.", "danger");
    }
  }

  async signUpUser(){
    const loading = await this.loadingController.create({
      message: 'Creating your account...'
    });
    await loading.present();

    await this.authService.signUp(this.registerForm.value.email, this.registerForm.value.password).then(async (cognitoUser) => {
      loading.dismiss();
      localStorage.setItem("signup_email", this.registerForm.value.email);
      this.registerForm.reset();
      const url = "/account-verification"
      this.router.navigateByUrl(url);
    })
    .catch(err => { loading.dismiss(); this.presentToast(err.message, "danger") })
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
