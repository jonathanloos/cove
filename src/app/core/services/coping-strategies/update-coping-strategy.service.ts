import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CopingStrategy } from 'src/models';
import { CopingStrategiesService } from './coping-strategies.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateCopingStrategyService {

  private updatedCopingStrategy: CopingStrategy;
  public editing: boolean = false;
  editChange: Subject<boolean> = new Subject<boolean>();

  constructor(private CSService: CopingStrategiesService) {  }

  async selectCopingStrategy(id: string){
    this.updatedCopingStrategy = await this.CSService.get(id);
    this.editing = true;
    this.editChange.next(this.editing);
  }

  cancelOperation(){
    this.editing = false;
    this.editChange.next(this.editing);
  }

  get(){
    return this.updatedCopingStrategy;
  }

  save(cs: CopingStrategy){
    this.updatedCopingStrategy = cs;
    this.CSService.update(this.updatedCopingStrategy);
    this.editing = false;
    this.editChange.next(this.editing);
  }    
}
