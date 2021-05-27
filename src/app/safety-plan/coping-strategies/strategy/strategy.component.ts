import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CopingStrategiesService } from 'src/app/core/services/coping-strategies/coping-strategies.service';
import { UpdateCopingStrategyService } from 'src/app/core/services/coping-strategies/update-coping-strategy.service';
import { CopingStrategy, User } from 'src/models';
import { MutableModel } from "@aws-amplify/datastore";
import { LoadingController } from '@ionic/angular';
import { Observable, Observer, BehaviorSubject } from 'rxjs';
import { ContactService } from 'src/app/core/services/contacts/contact.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Storage from '@aws-amplify/storage';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss'],
})
export class StrategyComponent implements OnInit {

  @Input() strategy: CopingStrategy;

  editing: boolean = false;
  elementId: string = null;
  public CSForm: FormGroup;

  public user$ = new Observable<User>((observer : Observer<User>) => {
    this.authService.currentUserSubject.subscribe(user => {
      observer.next(user);
    })
  });

  public imageUrl$ = new BehaviorSubject<Object | String>(null)
  
  constructor(
    private authService: AuthService,
    private CSService: CopingStrategiesService,
    private updateCSService: UpdateCopingStrategyService,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController
  ) {

    this.updateCSService.editChange.subscribe(result=> {
      let curr = this.updateCSService.get();
      if(result){
        this.elementId = curr.id
      }else{
        this.elementId = null;
      }
      this.editing = result;
    })
  }

  async ngOnInit() {
    this.CSForm = this.formBuilder.group({
      id: [this.strategy.id],
      title: [this.strategy.title, Validators.required],
      description: [this.strategy.description]
    });

    this.user$.subscribe(async (user) => {
      const result = await Storage.list(`${this.strategy.id}-coverPhoto.png`, { 
        level: 'private'
      });

      if(result.length > 0){
        const imageUrl = await Storage.get(`${this.strategy.id}-coverPhoto.png`, { level: 'private'})
        this.imageUrl$.next(imageUrl)
      }
    })
  }

  async cancel(){
    let curr = await this.CSService.get(this.strategy.id);
    if(curr !== undefined){
      this.CSForm.setValue({
        id: curr.id,
        title: curr.title, 
        description: curr.description
      })
    }
    
    this.updateCSService.cancelOperation();
  }

  save(){
    const new_strategy = CopingStrategy.copyOf(this.strategy, (mutable_sign: MutableModel<CopingStrategy>) => {
      mutable_sign.title = this.CSForm.value.title;
      mutable_sign.description = this.CSForm.value.description;
      return mutable_sign
    })

    this.updateCSService.save(new_strategy);
  }

  async uploadFile(e){
    const file = e.target.files[0];

    const loading = await this.loadingController.create({
      message: 'Uploading your image...',
      duration: 2000
    });

    await loading.present();

    const key = await Storage.put(`${this.strategy.id}-coverPhoto.png`, file, {
      contentType: 'image/png',
      level: 'private'
    });

    loading.dismiss();

    const imageUrl = await Storage.get(`${this.strategy.id}-coverPhoto.png`, { level: 'private'})
    this.imageUrl$.next(imageUrl)
  }

  openFileBrowser(e){
    e.preventDefault();
    let element : HTMLElement = document.getElementById(`strategyCoverPhotoUpload-${this.strategy.id}`) as HTMLElement;
    element.click();
  }
}
