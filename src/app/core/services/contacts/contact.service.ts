import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { DataStore } from '@aws-amplify/datastore'
import { Contact } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public contacts: Contact[] = [];

  public contactsChange: Subject<Contact[]> = new Subject<Contact[]>();

  constructor( private api : APIService ) {  }

  public async list(userId : string) {
    return await DataStore.query(Contact).then((results : any) => {
      this.contacts = results;
      this.contactsChange.next(this.contacts);
      return this.contacts;
    })
    .catch(err => {console.log(err)})
  }

  async get(id: string) {
    return await DataStore.query(Contact, id)
      .then((result : any) => {return result})
      .catch(err => {console.log(err)})
    }

  async update(contact: Contact) {
    await DataStore.save(contact).then((result : Contact) => {
      let index = this.contacts.findIndex(obj => obj.id == result.id)
      this.contacts[index] = result;
      this.contactsChange.next(this.contacts);
    })
    .catch(err => {console.log(err)})
  }

  async create(contact: Contact) {
    await DataStore.save(contact).then((result : Contact) => {
      this.list(result.userID)
    })
    .catch(err => {console.log(err)})
  }

  async delete(id: string) {
    const todoDelete = await DataStore.query(Contact, id)
    await DataStore.delete(todoDelete).then((result : Contact) => {
      this.list(result.userID);
    })
    .catch(err => {console.log(err)})
  }
}