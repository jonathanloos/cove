import { Injectable } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { DataStore, Predicates } from '@aws-amplify/datastore'
import { User } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private api : APIService ) {  }

  async get(userSub : string) {
    return await DataStore.query(User, user => user.userSub("eq", userSub)).then((result : any) => { return result[0] })
      .catch(err => {console.log(err)})
  }

  async create(user : User){
    await DataStore.save(user).then((result : any) => {
      return user;
    })
    .catch(err => {console.log(err)})
  }

  async update(user: User){
    return await DataStore.save(user).then((result : any) => {
      return result;
    })
    .catch(err => {console.log(err)})
  }

  async deleteUser(userSub : string){
    const todelete = await DataStore.query(User, user => user.userSub("eq", userSub)).then((users : any) => {return users[0]});
    return await DataStore.delete(todelete, Predicates.ALL).then(async (res) => {
      return await DataStore.query(User)
    })
  }
}