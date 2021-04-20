import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmptyStateObjectTransferService {

  public addEmptyStateToList: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  doTransfer(obj: any){
    this.addEmptyStateToList.next(obj);
  }
}
