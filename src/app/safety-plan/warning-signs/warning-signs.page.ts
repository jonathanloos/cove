import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WarningSignsService } from 'src/app/core/services/warning-signs/warning-signs.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User, WarningSign } from 'src/models';

@Component({
  selector: 'app-warning-signs',
  templateUrl: './warning-signs.page.html',
  styleUrls: ['./warning-signs.page.scss'],
})
export class WarningSignsPage implements OnInit {

  @ViewChild('content') private content: any;

  currentUser: User;
  currentUserSubscription: Subscription;
  
  signs: WarningSign[];
  adding:boolean = false;
  public wsForm: FormGroup;

  constructor(
    private warningSignService: WarningSignsService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
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
      })
    }

  async ngOnInit() { 
    await this.authService.currentAuthenticatedUser().then(async (user) => {
      this.currentUser = user;
      this.warningSignService.list(this.currentUser.id);
    });
  }

  displayForm(){
    this.adding = true;
  }

  reset(){
    this.adding = false;
    this.wsForm.reset();
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
}
