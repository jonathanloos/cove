import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CopingStrategiesService } from 'src/app/core/services/coping-strategies/coping-strategies.service';
import { UpdateCopingStrategyService } from 'src/app/core/services/coping-strategies/update-coping-strategy.service';
import { CopingStrategy } from 'src/models';
import { MutableModel } from "@aws-amplify/datastore";

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
  
  constructor(
    private CSService: CopingStrategiesService,
    private updateCSService: UpdateCopingStrategyService,
    private formBuilder: FormBuilder,
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
}
