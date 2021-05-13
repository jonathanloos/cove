import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WarningSignsService } from 'src/app/core/services/warning-signs/warning-signs.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User, WarningSign } from 'src/models';
import { EmptyStateObjectTransferService } from 'src/app/core/services/empty-state-object-transfer/empty-state-object-transfer.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-warning-signs',
  templateUrl: './warning-signs.page.html',
  styleUrls: ['./warning-signs.page.scss'],
})
export class WarningSignsPage implements OnInit {

  @ViewChild('content') private content: any;

  currentUser: User;
  public user$ : Subject<User> = new BehaviorSubject<User>(null);

  
  signs: WarningSign[];
  adding:boolean = false;
  public wsForm: FormGroup;

  public payload = {
    title: "Warning Signs",
    description: "Identifying signs that you may be experiencing a suicidal crisis can help you and others around you recognize when a crisis may occur.",
    list_prompt: "Here are some common warning signs you can use in your safety plan:",
    items: [
      {
        title: "Unable to sleep or sleeping all of the time.",
        description: "Changes in your sleep pattern can affect your thoughts and mood. Monitor your sleep to make sure you're getting enough, but not using it as a means to avoid other things."
      },
      {
        title: "Withdrawal from friends, family and society",
        description: "Isolation can make you feel safe, but can also make you feel unsupported. It is important to keep connections with loved ones strong and healthy, even during the hard times."
      },
      {
        title: "Dramatic mood changes",
        description: "Mood changes can be a sign that you may be feeling stressed or anxious."
      },
      {
        title: "Increased substance use (alcohol or drug)",
        description: "Although they may help some feel secure, outlets like substances can be dangerous if abused."
      },
      {
        title: "Feelings of helplessness or hopelessness",
        description: "Sometimes it may seem like you're on an island, but there is always hope and support."
      }
    ]
  }

  constructor(
    private warningSignService: WarningSignsService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private emptyStateTransferService: EmptyStateObjectTransferService,
    public toastController: ToastController
    ) { 

      warningSignService.signsChange.subscribe(result => {
        this.signs = result;
        if(this.signs.length == 0){
          this.adding = true;
        }
      })

      this.wsForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['']
      });

      this.emptyStateTransferService.addEmptyStateToList.subscribe((sign) => {
        this.saveWarningSign(sign);
      });
    }

  async ngOnInit() { 
    await this.authService.currentAuthenticatedUser().then(async (user) => {
      this.currentUser = user;
      this.user$.next(user)
      this.warningSignService.list(this.currentUser.id);
    });
  }

  toggleReorderGroup(ev) {
    // this.warningSignService.userFavourites(this.currentUser.id);
    // this.reordering = !this.reordering;
    // if(this.reorderGroup != undefined){
    //   this.reorderGroup.disabled = !this.reorderGroup.disabled;
    // }
  }

  displayForm(){
    this.adding = true;
  }

  reset(){
    this.adding = false;
    this.wsForm.reset();
  }

  async saveWarningSign(sign: any){
    const warningSign = new WarningSign({
      title: sign.title,
      description: sign.description,
      userID: this.currentUser.id
    })
    await this.warningSignService.create(warningSign).then(() => {
      this.presentToast("Added warning sign to your list.", "primary")
    });
  }

  create(){
    const ws  = new WarningSign({
      title: this.wsForm.value.title,
      description: this.wsForm.value.description,
      userID: this.currentUser.id
    })

    this.warningSignService.create(ws);

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
