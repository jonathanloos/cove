import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from 'src/models';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  private email =  localStorage.getItem("signup_email");
  verificationCodeForm: FormGroup;
  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false,
    allowTouchMove: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public toastController: ToastController,
    private router: Router,
    public loadingController: LoadingController
    ) { 
    this.verificationCodeForm = this.formBuilder.group({
      code: ['', Validators.compose([Validators.required, Validators.maxLength(6)])]
    })
  }

  ngOnInit() {
  }

  async confirmVerificationCode(){
    if(this.verificationCodeForm.valid){
      const loading = await this.loadingController.create({
        message: 'Confirming your account...',
        duration: 2000
      });
      await loading.present();

      await this.authService.confirmSignUp(this.email, String(this.verificationCodeForm.value.code)).then(async (succ) => {
        await this.authService.signIn(this.email, this.authService.tempPass).then(async (res) => {
          loading.dismiss();
          this.presentToast("🎉 Success!", "primary")
          const user = new User({
            email: this.email,
            userSub: res.attributes.sub
          });

          await this.authService.register(user).then(() => {
            this.verificationCodeForm.reset();

            const url = "/app/safety-plan/coping-strategies"
            this.router.navigateByUrl(url);
          });
        })
        .catch(err => { loading.dismiss(); this.presentToast(err.message, "danger") })
      })
      .catch(err => { loading.dismiss(); this.presentToast(err.message, "danger") })
    } else {
      this.presentToast("Please input a 6 digit verification code.", "toast")
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
