import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { DataStore } from '@aws-amplify/datastore'
import { CopingStrategy } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class CopingStrategiesService {

  private coping_strategies: CopingStrategy[] = [];

  public strategiesChange: Subject<CopingStrategy[]> = new Subject<CopingStrategy[]>();

  constructor( private api : APIService ) { }

  async list(userId : string){
    return await DataStore.query(CopingStrategy, c => c.userID("eq", userId)).then((results : CopingStrategy[]) => {
      this.coping_strategies = results;
      this.strategiesChange.next(this.coping_strategies);
      return this.coping_strategies;
    })
    .catch(err => {console.log(err)})
  }

  async get(id: string){
    return await DataStore.query(CopingStrategy, id)
      .then((result : any) => {return result})
      .catch(err => {console.log(err)})
    }

  async update(coping_strategy: CopingStrategy){
    await DataStore.save(coping_strategy).then((result : CopingStrategy) => {
      let index = this.coping_strategies.findIndex(obj => obj.id == result.id)
      this.coping_strategies[index] = result;
      this.strategiesChange.next(this.coping_strategies);
    })
    .catch(err => {console.log(err)})
  }

  async create(coping_strategy: CopingStrategy){
    console.log("Create!")
    await DataStore.save(coping_strategy).then((result : CopingStrategy) => {
      this.list(result.userID)
    })
    .catch(err => {console.log(err)})
  }

  async delete(id: string){
    const todoDelete = await DataStore.query(CopingStrategy, id)
    await DataStore.delete(todoDelete).then((result : CopingStrategy) => {
      this.list(result.userID);
    })
    .catch(err => {console.log(err)})
  }
}