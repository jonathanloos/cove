import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { DataStore, SortDirection, Predicates } from 'aws-amplify';
import { WarningSign } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class WarningSignsService {

  private warning_signs: WarningSign[] = [];

  public signsChange: Subject<WarningSign[]> = new Subject<WarningSign[]>();

  constructor( private api : APIService ) {  }

  public async list(userId: string) {
    return await DataStore.query(WarningSign, Predicates.ALL, {
      sort: s => s.order(SortDirection.ASCENDING)
    }).then((results : WarningSign[]) => {
      this.warning_signs = results;

      if(this.warning_signs[0].order == undefined){
        for(var i = 0; i < this.warning_signs.length; i++){
          console.log(i)
        }
      }
      
      this.signsChange.next(this.warning_signs);
      return this.warning_signs;
    })
    .catch(err => {console.log(err)})
  }

  async get(id: string) {
    return await DataStore.query(WarningSign, id)
      .then((result : any) => {return result})
      .catch(err => {console.log(err)})
    }

  async update(warning_sign: WarningSign) {
    await DataStore.save(warning_sign).then((result : WarningSign) => {
      let index = this.warning_signs.findIndex(obj => obj.id == result.id)
      this.warning_signs[index] = result;
      this.signsChange.next(this.warning_signs);
    })
    .catch(err => {console.log(err)})
  }

  async create(warning_sign: WarningSign) {
    await DataStore.save(warning_sign).then((result : WarningSign) => {
      this.list(result.userID)
    })
    .catch(err => {console.log(err)})
  }

  async delete(id: string) {
    const todoDelete = await DataStore.query(WarningSign, id)
    await DataStore.delete(todoDelete).then((result : WarningSign) => {
      this.list(result.userID);
    })
    .catch(err => {console.log(err)})
  }
}