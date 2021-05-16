import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { DataStore, SortDirection, Predicates } from 'aws-amplify';
import { WarningSign } from 'src/models';
import { MutableModel } from "@aws-amplify/datastore";

@Injectable({
  providedIn: 'root'
})
export class WarningSignsService {

  private warning_signs: WarningSign[] = [];

  public signsChange: Subject<WarningSign[]> = new Subject<WarningSign[]>();

  constructor( ) {  }

  public async list(userId: string) {
    return await DataStore.query(WarningSign, ws => ws.userID("eq", userId), {
      sort: s => s.order(SortDirection.ASCENDING),
    }).then((results : WarningSign[]) => {
      this.warning_signs = results;

      // Temp method to backfill order, too lazy to write a migration
      if(this.warning_signs[0].order == undefined){
        for(var i = 0; i < this.warning_signs.length; i++){
          const warning_sign = WarningSign.copyOf(this.warning_signs[i], (mutable_sign: MutableModel<WarningSign>) => {
            mutable_sign.order = i;
            return mutable_sign
          });
          DataStore.save(warning_sign);
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

  public orderIdResolver(warningSignIdsInOrder: any[]){
    warningSignIdsInOrder.forEach(async (id, index) => {
      let warningSign = await DataStore.query(WarningSign, id);

      const updated_sign = WarningSign.copyOf(warningSign, (mutable_sign: MutableModel<WarningSign>) => {
        mutable_sign.order = index;
        return mutable_sign
      });
      await DataStore.save(updated_sign)
    });
  }
}