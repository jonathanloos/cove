import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { DataStore } from 'aws-amplify';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

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
    public alertController: AlertController,
    public loadingController: LoadingController,
    private userService: UserService
  ) { 
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  async login(){
    if(this.loginForm.valid){
      const loading = await this.loadingController.create({
        message: 'Logging in...'
      });
      await loading.present();

      await this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password).then(async (res) => {
        loading.dismiss();
        DataStore.query;
        // await this.authService.scrubLocalDb(res.attributes.sub).then(async () => {
          this.loginForm.reset();

          const url = "/tabs/safety-plan";
          this.router.navigateByUrl(url);
        // });
      })
      .catch( async err => { 
        loading.dismiss();
        if(err.code == "UserNotConfirmedException"){
          const alert = await this.alertController.create({
            header: 'Unconfirmed Account Found',
            message: "To get you set up, we'll need to verify your email address. Do you want to continue?",
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
              }, {
                text: 'Resend Verification Code',
                handler: async () => {
                  this.authService.tempPass = this.loginForm.value.password;
                  await this.authService.resendVerificationCode(this.loginForm.value.email).then(succ => {
                    this.router.navigate(['/account-verification'])
                  })
                  .catch(err => {this.presentToast(err.message, "danger")})
                }
              }
            ]
          });
      
          await alert.present();
        } else {
          this.presentToast(err.message, "danger")
        }
      })
    }
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
