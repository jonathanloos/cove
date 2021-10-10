import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  
  verificationCodeForm: FormGroup;
  private email =  localStorage.getItem("signup_email");
  submitted = false;

  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false,
    allowTouchMove: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private router: Router
  ) { 
    this.verificationCodeForm = this.formBuilder.group({
      code: ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern("^[0-9]*$")])],
      newPassword: ['', Validators.compose([Validators.required])],
      confirmNewPassword: ['', Validators.compose([Validators.required])]
    }, { validator: MustMatch('newPassword', 'confirmNewPassword') })
  }

  ngOnInit() {
    
  }

  // convenience getter for easy access to form fields
  get f() { return this.verificationCodeForm.controls; }

  async confirmVerificationCode(){
    this.submitted = true;

    if(this.verificationCodeForm.valid){
      const loading = await this.loadingController.create({
        message: 'Confirming your pass...',
        duration: 2000
      });

      await loading.present();

      await this.authService.confirmPasswordConfirmationCode(this.email, String(this.verificationCodeForm.value.code), String(this.verificationCodeForm.value.newPassword)).then(async (succ) => {
        await this.authService.signIn(this.email, this.verificationCodeForm.value.newPassword).then(async (res) => {
          loading.dismiss();
          this.presentToast("🎉 Success!", "primary");
            const url = "/tabs/safety-plan"
            this.router.navigateByUrl(url);
        })
        .catch(err => { loading.dismiss(); this.presentToast(err.message, "danger") })
      })
      .catch(err => { loading.dismiss(); this.presentToast(err.message, "danger") })
    } else {
      this.presentToast("Form is invalid.", "toast")
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
