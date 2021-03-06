import { Component, OnInit, ViewChild } from '@angular/core';
import { CopingStrategiesService } from 'src/app/core/services/coping-strategies/coping-strategies.service';
import { UpdateCopingStrategyService } from 'src/app/core/services/coping-strategies/update-coping-strategy.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { CopingStrategy, User } from 'src/models';

@Component({
  selector: 'app-coping-strategies',
  templateUrl: './coping-strategies.page.html',
  styleUrls: ['./coping-strategies.page.scss'],
})
export class CopingStrategiesPage implements OnInit {

  @ViewChild('content') private content: any;
  
  currentUser: User;
  
  public strategies: CopingStrategy[];
  public editing: boolean = false;
  public elementId: string;
  strategyForm: FormGroup;
  adding:boolean = false;

  constructor(
    private copingStrategyService: CopingStrategiesService,
    private updateCopingStrategyService: UpdateCopingStrategyService,
    private formBuilder: FormBuilder,
    private authService: AuthService
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
    }

  async ngOnInit() { 
    await this.authService.currentAuthenticatedUser().then(async (user) => {
      this.currentUser = user;
      this.copingStrategyService.list(this.currentUser.id);
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
}
