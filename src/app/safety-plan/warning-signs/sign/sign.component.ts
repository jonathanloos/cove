import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { WarningSignsService } from 'src/app/core/services/warning-signs/warning-signs.service';
import { UpdateWarningSignService } from 'src/app/core/services/warning-signs/update-warning-sign.service';
import { WarningSign } from 'src/models';
import { MutableModel } from "@aws-amplify/datastore";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {

  @Input() sign: WarningSign;

  editing: boolean = false;
  elementId:string = null;
  public signForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private WSService: WarningSignsService,
    private updateWSService: UpdateWarningSignService,
    private formBuilder: FormBuilder
  ) { 

    updateWSService.editChange.subscribe(result => {
      let curr = this.updateWSService.get(); 
      if(result){
        this.elementId = curr.id
      }else{
        this.elementId = null;
      }
      this.editing = result;
    });
  }

  ngOnInit() {
    this.signForm = this.formBuilder.group({
      id:[this.sign.id],
      title: [this.sign.title, Validators.required],
      description: [this.sign.description]
    })
  }

  async reset(){
    let curr = await this.WSService.get(this.sign.id);
    this.signForm.setValue({
      id: curr.id, 
      title: curr.title, 
      description: curr.description
    });
    this.updateWSService.cancelOperation();
  }

  save(){
    const warning_sign = WarningSign.copyOf(this.sign, (mutable_sign: MutableModel<WarningSign>) => {
      mutable_sign.title = this.signForm.value.title;
      mutable_sign.description = this.signForm.value.description;
      return mutable_sign
    })

    this.updateWSService.save(warning_sign);
  }
}
