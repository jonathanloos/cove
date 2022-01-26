import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { DataStore } from '@aws-amplify/datastore'
import { Contact } from 'src/models';
import { SortDirection } from 'aws-amplify';
import { MutableModel } from "@aws-amplify/datastore";
import Storage from '@aws-amplify/storage';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public contacts: Contact[] = [];

  public contactsChange: Subject<Contact[]> = new Subject<Contact[]>();

  constructor( private api : APIService ) {  }

  public async list(userId : string) {
    return await DataStore.query(Contact, c => c.userID("eq", userId), {
      sort: s => s.order(SortDirection.ASCENDING),
    }).then((results : any) => {
      this.contacts = results;

      // Temp method to backfill order, too lazy to write a migration
      if(this.contacts.length > 0 && this.contacts[0].order == undefined){
        for(var i = 0; i < this.contacts.length; i++){
          const warning_sign = Contact.copyOf(this.contacts[i], (mutable_contact: MutableModel<Contact>) => {
            mutable_contact.order = i;
            return mutable_contact
          });
          DataStore.save(warning_sign);
        }
      }
      
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
    await DataStore.delete(todoDelete).then(async (result : Contact) => {
      await Storage.remove(`${todoDelete.id}-contactPhoto.png`, { level: 'private' });

      this.list(result.userID);
    })
    .catch(err => {console.log(err)})
  }

  public orderIdResolver(contactIdsInOrder: any[]){
    contactIdsInOrder.forEach(async (id, index) => {
      let contact = await DataStore.query(Contact, id);

      const updated_contact = Contact.copyOf(contact, (mutable_contact: MutableModel<Contact>) => {
        mutable_contact.order = index;
        return mutable_contact
      });
      await DataStore.save(updated_contact)
    });
  }
}
