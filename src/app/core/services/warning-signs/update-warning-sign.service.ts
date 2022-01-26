import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WarningSign } from 'src/models';
import { WarningSignsService } from './warning-signs.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateWarningSignService {

  private updatedWS: WarningSign;
  public editing: boolean = false;
  editChange: Subject<boolean> = new Subject<boolean>();

  constructor(private WSService: WarningSignsService) {   }

  async selectWS(id: string){
    this.updatedWS = await this.WSService.get(id);
    this.editing = true;
    this.editChange.next(this.editing);
  }

  get(){
    return this.updatedWS;
  }

  cancelOperation(){
    this.editing = false;
    this.editChange.next(this.editing);
  }

  save(ws: WarningSign){
    this.updatedWS = ws;
    this.WSService.update(ws);
    this.editing = false;
    this.editChange.next(this.editing)
  }
  
}
