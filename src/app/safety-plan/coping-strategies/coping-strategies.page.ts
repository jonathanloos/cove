import { Component, OnInit, ViewChild } from '@angular/core';
import { CopingStrategiesService } from 'src/app/core/services/coping-strategies/coping-strategies.service';
import { UpdateCopingStrategyService } from 'src/app/core/services/coping-strategies/update-coping-strategy.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { CopingStrategy, User } from 'src/models';
import { EmptyStateObjectTransferService } from 'src/app/core/services/empty-state-object-transfer/empty-state-object-transfer.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-coping-strategies',
  templateUrl: './coping-strategies.page.html',
  styleUrls: ['./coping-strategies.page.scss'],
})
export class CopingStrategiesPage implements OnInit {

  @ViewChild('content') private content: any;
  
  currentUser: User;
  public user$ : Subject<User> = new BehaviorSubject<User>(null);
  
  public strategies: CopingStrategy[];
  public editing: boolean = false;
  public elementId: string;
  strategyForm: FormGroup;
  adding:boolean = false;

  public payload = {
    title: "Coping Strategies",
    description: "If you feel like you're approaching a crisis, it's important to ...",
    list_prompt: "Here are some common coping strategies you can use in your safety plan:",
    items: [
      {
        title: "Remind yourself of the good things in your life",
        description: "Forgetting about the good things in your life is easy if you're feeling bad. Take a moment to think of what makes you happy."
      },
      {
        title: "Make your environment safe",
        description: "Remove potentially harmful tools from your environment, go to a trusted friend's house or ask someone to come over and help."
      },
      {
        title: "Seek professional help",
        description: "If you are currently receiving treatment, it is strongly suggested you reach out to them for help. If you are not receiving, consider booking a session."
      }
    ]
  }

  constructor(
    private copingStrategyService: CopingStrategiesService,
    private updateCopingStrategyService: UpdateCopingStrategyService,
    private formBuilder: FormBuilder,
    private emptyStateTransferService: EmptyStateObjectTransferService,
    private authService: AuthService,
    public toastController: ToastController
    ) { 
      this.strategyForm = this.formBuilder.group({
        title: ['',  Validators.required],
        description: ['']
      })

      updateCopingStrategyService.editChange.subscribe(result => {
        let curr = this.updateCopingStrategyService.get();
        if (result){
          this.elementId = curr.id;
        }
        this.editing = result;
      });

      copingStrategyService.strategiesChange.subscribe(result => {
        this.strategies = result;
        if(this.strategies.length == 0){
          this.adding = true;
        }
      })

      this.emptyStateTransferService.addEmptyStateToList.subscribe((strategy) => {
        this.saveCopingStrategy(strategy);
      })
    }

  async ngOnInit() { 
    await this.authService.currentAuthenticatedUser().then(async (user) => {
      this.currentUser = user;
      this.user$.next(user)
      this.copingStrategyService.list(this.currentUser.id);
    });
  }

  async saveCopingStrategy(sign: any){
    const copingStrategy = new CopingStrategy({
      title: sign.title,
      description: sign.description,
      userID: this.currentUser.id
    })

    await this.copingStrategyService.create(copingStrategy).then(() => {
      this.presentToast("Added coping strategy to your list.", "primary")
    });
  }

  displayForm(){
    this.adding = true;
  }

  reset(){
    this.adding = false;
    this.strategyForm.reset();
  }

  create(){
    const strategy  = new CopingStrategy({
      title: this.strategyForm.value.title,
      description: this.strategyForm.value.description,
      userID: this.currentUser.id
    });


    this.copingStrategyService.create(strategy);
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
